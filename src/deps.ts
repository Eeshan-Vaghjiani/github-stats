// Deno dependencies for trophy functionality
// Note: soxa package doesn't exist at the specified URL, using native fetch wrapper
export {
  Bulk,
  connect,
  type Redis,
} from "https://deno.land/x/redis@v0.29.0/mod.ts";

// Testing dependencies (only used in __tests__ files, won't be bundled for production)
export {
  assertEquals,
  assertRejects,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
export {
  assertSpyCall,
  assertSpyCalls,
  returnsNext,
  spy,
  stub,
} from "https://deno.land/std@0.224.0/testing/mock.ts";

// Soxa HTTP client wrapper (using native fetch)
export const soxa = {
  post: async (url: string, options: any = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: options.headers || {},
      body: JSON.stringify(options.body || {}),
    });
    const data = await response.json();
    return {
      data,
      status: response.status,
      headers: response.headers,
    };
  },
  get: async (url: string, options: any = {}) => {
    const response = await fetch(url, {
      method: "GET",
      headers: options.headers || {},
    });
    const data = await response.json();
    return {
      data,
      status: response.status,
      headers: response.headers,
    };
  },
};
