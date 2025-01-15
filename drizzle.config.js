import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

export default defineConfig({
    dialect: "turso",
    schema: "./src/database/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: env.dbFileName,
    },
});
