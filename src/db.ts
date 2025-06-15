import type { Context } from "hono";
import type { D1Database } from "@cloudflare/workers-types";

export function getDB(c: Context) {
    return c.env.DB as D1Database;
}