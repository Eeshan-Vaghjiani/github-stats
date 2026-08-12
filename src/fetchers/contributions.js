// @ts-check

import { CustomError, MissingParamError } from "../common/error.js";
import { request } from "../common/http.js";
import { retryer } from "../common/retryer.js";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const contributionQuery = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      name
      login
      contributionsCollection(from: $from, to: $to) {
        contributionYears
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              weekday
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const toDateString = (date) => new Date(date).toISOString().slice(0, 10);

const yearStart = (year) => `${year}-01-01T00:00:00.000Z`;

const yearEnd = (year, now) =>
  year === now.getUTCFullYear()
    ? now.toISOString()
    : `${year}-12-31T23:59:59.999Z`;

const parseContributionResponse = (response) => {
  if (response?.data?.errors?.length) {
    throw new CustomError(
      response.data.errors[0].message || "Could not fetch user",
      CustomError.USER_NOT_FOUND,
    );
  }

  const user = response?.data?.data?.user;
  if (!user) {
    throw new CustomError("User not found", CustomError.USER_NOT_FOUND);
  }

  return user;
};

/**
 * Fetches a user's authenticated contribution calendar and all-time total.
 * GitHub limits a contribution calendar query to one year, so yearly totals
 * are combined. The authenticated `read:user` scope allows GitHub to include
 * private and internal contributions when the account has enabled that setting.
 *
 * @param {string} username GitHub username.
 * @param {Date=} now Time to use as the end of the calendar range.
 * @returns {Promise<{name: string, username: string, totalContributions: number, firstContribution?: string, days: Array<{date: string, count: number, level: string, weekday: number, week: number}>}>} Contribution calendar data.
 */
const fetchContributionCalendar = async (username, now = new Date()) => {
  if (!username) {
    throw new MissingParamError(["username"]);
  }

  const to = new Date(now);
  const from = new Date(to.getTime() - 364 * DAY_IN_MS);
  const fetcher = (variables, token) =>
    request(
      { query: contributionQuery, variables },
      { Authorization: `bearer ${token}` },
    );

  const fetchCollection = async (start, end) => {
    const response = await retryer(fetcher, {
      login: username,
      from: start,
      to: end,
    });
    return parseContributionResponse(response);
  };

  // This calendar powers the graph and streak calculations.
  const rollingUser = await fetchCollection(
    from.toISOString(),
    to.toISOString(),
  );
  const rollingCollection = rollingUser.contributionsCollection;
  const rollingDays = rollingCollection.contributionCalendar.weeks
    .flatMap((week, weekIndex) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: day.contributionLevel,
        weekday: day.weekday,
        week: weekIndex,
      })),
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  // GitHub exposes the user's contribution years even when the requested
  // collection is only one year wide. Fetch each year separately to produce
  // the same all-time total shown by GitHub's own contribution profile.
  const years = [...new Set(rollingCollection.contributionYears || [])]
    .filter((year) => Number.isInteger(year) && year <= to.getUTCFullYear())
    .sort((a, b) => a - b);
  if (!years.includes(to.getUTCFullYear())) {
    years.push(to.getUTCFullYear());
  }

  const yearlyUsers = await Promise.all(
    years.map((year) => fetchCollection(yearStart(year), yearEnd(year, to))),
  );
  const totalContributions = yearlyUsers.reduce(
    (total, user) =>
      total +
      user.contributionsCollection.contributionCalendar.totalContributions,
    0,
  );
  const firstContribution = yearlyUsers
    .flatMap((user) => user.contributionsCollection.contributionCalendar.weeks)
    .flatMap((week) => week.contributionDays)
    .filter((day) => day.contributionCount > 0)
    .map((day) => day.date)
    .sort()[0];

  return {
    name: rollingUser.name || rollingUser.login,
    username: rollingUser.login,
    totalContributions,
    firstContribution,
    days: rollingDays,
  };
};

export { fetchContributionCalendar, toDateString };
export default fetchContributionCalendar;
