const REDACTED = "[REDACTED]";

// Matches common PII shapes embedded in free-form strings (message, error text, context values).
const VALUE_PATTERNS: RegExp[] = [
    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, // email
    /\b\d{3}-\d{2}-\d{4}\b/g, // SSN
    /(?:\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g, // phone
    /\b(?:\d[ -]?){13,16}\b/g, // credit card
];

// Context keys redacted outright regardless of value shape, since the key name alone signals PII.
const SENSITIVE_KEY_PATTERN =
    /password|token|secret|authorization|api[-_]?key|ssn|email|phone|address|dob|birth[-_]?date|credit[-_]?card/i;

const redactString = (value: string): string =>
    VALUE_PATTERNS.reduce((result, pattern) => result.replace(pattern, REDACTED), value);

const redactValue = (key: string, value: unknown): unknown => {
    if (SENSITIVE_KEY_PATTERN.test(key)) {
        return REDACTED;
    }
    if (typeof value === "string") {
        return redactString(value);
    }
    if (Array.isArray(value)) {
        return value.map((item) => redactValue(key, item));
    }
    if (value && typeof value === "object") {
        return redactContext(value as Record<string, unknown>);
    }
    return value;
};

// Strips PII from free-form context before a log event reaches any destination (console or a
// registered backend handler) — this is the one sanctioned redaction boundary for the whole app.
export const redactContext = (context: Record<string, unknown>): Record<string, unknown> =>
    Object.fromEntries(Object.entries(context).map(([key, value]) => [key, redactValue(key, value)]));

export const redactText = redactString;
