// Deno dependencies for trophy functionality
export { connect, type Redis } from "https://deno.land/x/redis@v0.29.0/mod.ts";

// Bulk type - Redis response type (string or null)
export type Bulk = string | null;
