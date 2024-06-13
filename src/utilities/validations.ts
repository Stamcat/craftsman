/** #__PURE__ */
export function isEmpty(value: unknown): boolean {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value as object).length === 0) ||
        (typeof value === "string" && value.trim().length === 0) ||
        (typeof value === "string" && value === " ")
    );
}
