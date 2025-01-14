import { z } from "zod";
import {
    productInsertSchema,
    productSelectSchema,
} from "../app/models/product";

/**
 * @typedef {import('zod').z} z
 * @typedef {import('../app/models/product').productInsertSchema} productInsertSchema
 * @typedef {import('../app/models/product').productSelectSchema} productSelectSchema
 */

/**
 * @typedef {z.infer<typeof productSelectSchema>} ProductSelect
 */

/**
 * @typedef {z.infer<typeof productInsertSchema>} ProductInsert
 */

/**
 * @template ErrorType
 * @typedef {Object} ErrorCommandResult
 * @property {false} success - Indicates failure
 * @property {ErrorType} error - The error object
 */

/**
 * @template Result
 * @typedef {Object} SuccessCommandResult
 * @property {true} success - Indicates success
 * @property {Result} data - The result data
 */

/**
 * @template Result, ErrorType
 * @typedef {SuccessCommandResult<Result> | ErrorCommandResult<ErrorType>} CommandResult
 */

/**
 * @typedef {Object} EnvironmentVariables
 * @property {number} port - The port number
 * @property {string} dbFileName - The database file name
 */
