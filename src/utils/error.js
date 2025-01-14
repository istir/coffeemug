import { ZodError } from "zod";

/**
 * @param {ZodError|Error} error
 */
export function getErrorMessage(error) {
    if (isZodError(error)) {
        return error.flatten();
    }
    return error.message;
}

/**
 * @param {any} error
 * @returns {error is ZodError}
 */
function isZodError(error) {
    return !!error.flatten;
}
