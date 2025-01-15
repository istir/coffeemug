import type { ZodError } from "zod";

export type ErrorCommandResult<ErrorType> = {
    success: false;
    error: ErrorType;
};
type SuccessCommandResult<Result> = { success: true; data: Result };

export type CommandResult<Result, ErrorType = ZodError | Error> =
    | SuccessCommandResult<Result>
    | ErrorCommandResult<ErrorType>;
