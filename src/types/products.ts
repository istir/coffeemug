import { z } from "zod";
import {
    productInsertSchema,
    productSelectSchema,
} from "../../app/models/product";

export type ProductSelect = z.infer<typeof productSelectSchema>;
export type ProductInsert = z.infer<typeof productInsertSchema>;
