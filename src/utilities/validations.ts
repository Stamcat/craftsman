/* #__PURE__ */
export function isEmpty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value as object).length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    (typeof value === "string" && value === " ")
  );
}
/* #__PURE__ */
export function validateEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}
