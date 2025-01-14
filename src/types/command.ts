import { ZodError } from "zod";

type ErrorCommandResult<ErrorType> = {
    success: false;
    error: ErrorType;
};
type SuccessCommandResult<Result> = { success: true; data: Result };

export type CommandResult<Result, ErrorType = ZodError> =
    | SuccessCommandResult<Result>
    | ErrorCommandResult<ErrorType>;
