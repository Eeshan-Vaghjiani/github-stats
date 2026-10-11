// @ts-check

import { CustomError } from "./error.js";
import { logger } from "./log.js";

// Script variables.

// Count the number of GitHub API tokens available.
const PATs = Object.keys(process.env).filter((key) =>
  /PAT_\d*$/.exec(key),
).length;
const RETRIES = process.env.NODE_ENV === "test" ? 7 : PATs;

/**
 * Env var name of the token to use for this attempt. A user's own token
 * (`PAT_<LOGIN>`, e.g. `PAT_QUANTANMREAPER`) goes first because only it can
 * see that user's private repos/PRs; the shared `PAT_1..n` are the fallback.
 *
 * @param {string | undefined} login GitHub username being fetched.
 * @param {number} retries Attempt index.
 * @returns {string} Env var name.
 */
const tokenName = (login, retries) => {
  const own = login && `PAT_${String(login).toUpperCase().replace(/-/g, "_")}`;
  if (!own || !process.env[own]) {
    return `PAT_${retries + 1}`;
  }
  return retries === 0 ? own : `PAT_${retries}`;
};

/**
 * @typedef {import("axios").AxiosResponse} AxiosResponse Axios response.
 * @typedef {(variables: any, token: string, retriesForTests?: number) => Promise<AxiosResponse>} FetcherFunction Fetcher function.
 */

/**
 * Try to execute the fetcher function until it succeeds or the max number of retries is reached.
 *
 * @param {FetcherFunction} fetcher The fetcher function.
 * @param {any} variables Object with arguments to pass to the fetcher function.
 * @param {number} retries How many times to retry.
 * @returns {Promise<any>} The response from the fetcher function.
 */
const retryer = async (fetcher, variables, retries = 0) => {
  if (!RETRIES) {
    throw new CustomError("No GitHub API tokens found", CustomError.NO_TOKENS);
  }

  if (retries > RETRIES) {
    throw new CustomError(
      "Downtime due to GitHub API rate limiting",
      CustomError.MAX_RETRY,
    );
  }

  const pat = tokenName(variables?.login, retries);
  try {
    let response = await fetcher(
      variables,
      // @ts-ignore
      process.env[pat],
      // used in tests for faking rate limit
      retries,
    );

    // react on both type and message-based rate-limit signals.
    // https://github.com/anuraghazra/github-readme-stats/issues/4425
    const errors = response?.data?.errors;
    const errorType = errors?.[0]?.type;
    const errorMsg = errors?.[0]?.message || "";
    const isRateLimited =
      (errors && errorType === "RATE_LIMITED") || /rate limit/i.test(errorMsg);

    // if rate limit is hit increase the RETRIES and recursively call the retryer
    // with username, and current RETRIES
    if (isRateLimited) {
      logger.log(`${pat} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    }

    // finally return the response
    return response;
  } catch (err) {
    /** @type {any} */
    const e = err;

    // network/unexpected error → let caller treat as failure
    if (!e?.response) {
      throw e;
    }

    // prettier-ignore
    // also checking for bad credentials if any tokens gets invalidated
    const isBadCredential =
      e?.response?.data?.message === "Bad credentials";
    const isAccountSuspended =
      e?.response?.data?.message === "Sorry. Your account was suspended.";

    if (isBadCredential || isAccountSuspended) {
      logger.log(`${pat} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    }

    // HTTP error with a response → return it for caller-side handling
    return e.response;
  }
};

export { retryer, RETRIES };
export default retryer;
