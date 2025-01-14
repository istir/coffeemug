import "dotenv/config";

/** @type {EnvironmentVariables} */
export const env = {
    port: Number.parseInt(process.env.PORT || "3000"),
    dbFileName: process.env.DB_FILE_NAME || ":memory:",
};
