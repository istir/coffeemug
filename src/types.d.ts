import type { z, ZodError } from "zod";
import type {
    productInsertSchema,
    productSelectSchema,
} from "../app/models/product";

type ProductSelect = z.infer<typeof productSelectSchema>;
export type ProductInsert = z.infer<typeof productInsertSchema>;
type ErrorCommandResult<ErrorType> = {
    success: false;
    error: ErrorType;
};
type SuccessCommandResult<Result> = { success: true; data: Result };

type CommandResult<Result, ErrorType> =
    | SuccessCommandResult<Result>
    | ErrorCommandResult<ErrorType>;

type EnvironmentVariables = {
    port: number;
    dbFileName: string;
};
