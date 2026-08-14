// Deno dependencies for trophy functionality
export { soxa } from "https://deno.land/x/soxa@v1.8/mod.ts";
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
