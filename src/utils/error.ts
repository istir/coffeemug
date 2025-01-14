import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

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
    res.status(404).json({ error: "Not found" });
}

function isZodError(error: any): error is ZodError {
    return !!error.flatten;
}
