export function isEmpty(value: unknown): boolean {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value as object).length === 0) ||
        (typeof value === "string" && value.trim().length === 0) ||
        (typeof value === "string" && value === " ")
    );
}
export function validateEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}
/**
 * This exists in Stamcat/Localize, but since we're using so little of it at this point in time, 
 * we're duplicating code to reduce dependency
 */
export const getUnitLabel = (
    locale: Intl.LocalesArgument,
    unit: Intl.NumberFormatOptions["unit"],
    override?: string,
): string =>
    override ??
    new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "long" })
        .formatToParts(1)
        .find((p) => p.type === "unit")?.value ??
    String(unit);
        
/**
 * This exists in Stamcat/Localize, but since we're using so little of it at this point in time, 
 * we're duplicating code to reduce dependency
 */
export const is24HourFormat = (locale: Intl.LocalesArgument) => {
    const options = new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions();
    return options.hourCycle === "h23" || options.hourCycle === "h24";
}

export const getAmPmLabels = (locale: Intl.LocalesArgument): [string, string] => {
    const fmt = new Intl.DateTimeFormat(locale, { hour: "numeric", hour12: true });
    const am = fmt.formatToParts(new Date(2000, 0, 1, 9)).find((p) => p.type === "dayPeriod")?.value ?? "AM";
    const pm = fmt.formatToParts(new Date(2000, 0, 1, 21)).find((p) => p.type === "dayPeriod")?.value ?? "PM";
    return [am, pm];
};
