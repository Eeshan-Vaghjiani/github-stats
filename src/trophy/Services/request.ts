import {
  EServiceKindError,
  GithubError,
  QueryDefaultResponse,
  ServiceError,
} from "../Types/index.ts";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export async function requestGithubData<T = unknown>(
  query: string,
  variables: { [key: string]: string },
  token = "",
) {
  const rawResponse = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const responseJson = await rawResponse.json();
  const response = {
    data: responseJson as QueryDefaultResponse<{ user: T }>["data"],
  } as QueryDefaultResponse<{ user: T }>;
  const responseData = response.data;

  if (responseData?.errors?.length) {
    console.error(
      "GitHub GraphQL errors:",
      JSON.stringify(responseData.errors, null, 2),
    );

    throw new ServiceError(
      responseData.errors.map((error) => error.message).join("; "),
      getGraphQLErrorKind(responseData.errors),
    );
  }

  if (responseData?.data?.user) {
    return responseData.data.user;
  }

  throw handleError(responseData);
}

function getGraphQLErrorKind(errors: GithubError[]): EServiceKindError {
  const errorTypes = errors.map((error) => error.type);

  if (errorTypes.some((type) => type?.includes(EServiceKindError.RATE_LIMIT))) {
    return EServiceKindError.RATE_LIMIT;
  }

  if (errorTypes.every((type) => type === EServiceKindError.NOT_FOUND)) {
    return EServiceKindError.NOT_FOUND;
  }

  return EServiceKindError.UPSTREAM;
}

function handleError(responseData: {
  data?: unknown;
  errors?: GithubError[];
  message?: string;
  documentation_url?: string;
}): ServiceError {
  let isRateLimitExceeded = false;
  const arrayErrors = responseData?.errors || [];

  if (Array.isArray(arrayErrors) && arrayErrors.length > 0) {
    isRateLimitExceeded = arrayErrors.some((error) =>
      error.type.includes(EServiceKindError.RATE_LIMIT),
    );
  }

  if (responseData?.message) {
    isRateLimitExceeded = responseData.message
      .toLowerCase()
      .includes("rate limit");
  }

  if (isRateLimitExceeded) {
    throw new ServiceError("Rate limit exceeded", EServiceKindError.RATE_LIMIT);
  }

  throw new ServiceError("unknown error", EServiceKindError.NOT_FOUND);
}
