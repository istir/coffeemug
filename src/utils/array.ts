export function removeDuplicates<T = number>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}
