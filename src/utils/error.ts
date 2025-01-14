import { ZodError } from "zod";

export function getErrorMessage(error: ZodError | Error) {
    if (isZodError(error)) {
        return error.flatten();
    }
    return error.message;
}

function isZodError(error: any): error is ZodError {
    return !!error.flatten;
}
