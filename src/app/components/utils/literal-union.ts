/**
 * @description Taken from [Github](https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609)
 */
export type LiteralUnion<T extends U, U = string> = T | (U & { __DOES_NOT_EXIST?: never })
