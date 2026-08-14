// Test-only Deno dependencies — NOT imported by production code
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
