import type { DrizzleError } from "drizzle-orm";
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
    // this helps with passing transactions to other functions that could interact with database normally or in a transaction.
    // sadly, it requires some casting
    return tx.transaction(cb as any);
}
