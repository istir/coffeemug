import "dotenv/config";
import type { EnvironmentVariables } from "./types/env";

export const env = {
    port: Number.parseInt(process.env.PORT || "3000"),
    dbFileName: process.env.DB_FILE_NAME || "file:database.db",
} satisfies EnvironmentVariables;
