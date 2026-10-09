import { isEmpty } from "../../utilities";

export const parseTimeString = (val: unknown): [number, number] => {
    if (typeof val !== "string" || !val.includes(":")) {
        return [0, 0];
    }
    const [h, m] = val.split(":").map(Number);
    return [isNaN(h) ? 0 : h, isNaN(m) ? 0 : m];
};

export const padTime = (n: number) => String(n).padStart(2, "0");

export const toDisplayHour = (hours: number, is12h: boolean): number =>
    is12h ? (hours % 12 === 0 ? 12 : hours % 12) : hours;

export const to24Hour = (display: number, isPM: boolean, is12h: boolean): number => {
    if (!is12h) {
        return display;
    }
    return display === 12 ? (isPM ? 12 : 0) : isPM ? display + 12 : display;
};

export const resolveLocale = (locale?: Intl.LocalesArgument): string => {
    if (!locale) {
        return typeof navigator !== "undefined" ? navigator.language : "en-US";
    }
    return Array.isArray(locale) ? String(locale[0]) : String(locale);
};

export const resolveTimeFormat = (format: 24 | 12 | undefined, is24h: boolean): 24 | 12 => format ?? (is24h ? 24 : 12);

export const resolveHasValue = (value: React.ComponentProps<"input">["value"], internalHours: number | null) =>
    value !== undefined ? !isEmpty(value) : internalHours !== null;

export const resolveTime = (value: unknown, h: number | null, m: number | null): [number, number] =>
    !isEmpty(value) ? parseTimeString(value) : [h ?? 0, m ?? 0];

export const toDisplayInputValue = (hasVal: boolean, val: string | number) => (hasVal ? String(val) : "");
