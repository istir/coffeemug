import { DrizzleError } from "drizzle-orm";
import { db } from "./driver";

export function isDrizzleError(error: any): error is DrizzleError {
    return error?.name === "DrizzleError";
}

export function isRollbackError(error: any) {
    return isDrizzleError(error) && error.message === "Rollback";
}

export async function createTransaction<T extends typeof db, R>(
    cb: (trx: T) => R,
    tx = db,
): Promise<R> {
    // biome-ignore lint/suspicious/noExplicitAny: callback doesn't really have correct typing
    return tx.transaction(cb as any);
}
