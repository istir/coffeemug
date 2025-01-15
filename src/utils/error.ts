import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";
import type { ErrorCommandResult } from "../types/command";

export function getErrorMessage(error: ZodError | Error) {
    if (isZodError(error)) {
        return error.flatten();
    }
    return error.message;
}

export function jsonErrorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    res.status(500).json({ error: err });
}

export function notFoundErrorHandler(
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    console.log(_req.method, _req.url, "Not found");
    res.status(404).json({ error: "Not found" });
}

function isZodError(error: any): error is ZodError {
    return !!error.flatten;
}

export function isError(error: any): error is Error {
    return !!error?.name;
}

export function respondWithGenericCommandError(
    error: any,
): ErrorCommandResult<Error> {
    if (isError(error)) {
        return { success: false, error };
    } else {
        return { success: false, error: new Error("Unknown error") };
    }
}
