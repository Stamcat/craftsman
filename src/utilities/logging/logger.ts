import { getLogDestination, getLogDestinationsByLevel } from "./utilities";
import { LogEventSchema } from "./schemas";
import type { LogEvent, LogEventInput } from "./types";
import { CONSOLE_METHOD } from "./constants";
import { redactContext, redactText } from "./redact";

// Detecting the deployment environment is host-app specific (see ../splunk.ts) — the library
// only records whatever the caller passes in via `LogEventInput.environment`.

const serializeError = (error: unknown): LogEvent["error"] => {
    if (!error) {
        return null;
    }
    if (error instanceof Error) {
        return { name: error.name, message: redactText(error.message), stack: error.stack ? redactText(error.stack) : null };
    }
    return { name: "UnknownError", message: redactText(String(error)), stack: null };
};

const buildEvent = (input: LogEventInput): LogEvent => {
    return LogEventSchema.parse({
        level: input.level,
        message: redactText(input.message),
        timestamp: new Date().toISOString(),
        environment: input.environment ?? null,
        context: input.context ? redactContext(input.context) : null,
        tags: input.tags ?? [],
        error: serializeError(input.error),
    });
};

const emit = (event: LogEvent): void => {
    // This is the one sanctioned console boundary; every other module should go through `logger`.
    // eslint-disable-next-line no-console -- logger.ts is the sanctioned console boundary for the whole app
    console[CONSOLE_METHOD[event.level]](`[${event.level.toUpperCase()}] ${event.message}`, {
        context: event.context,
        error: event.error,
        tags: event.tags,
    });

    for (const destination of getLogDestinationsByLevel()[event.level]) {
        getLogDestination(destination)?.(event);
    }
};

/**
 * Builds a standardized log event and fire-and-forget POSTs it to any service endpoint.
 * Delivery failures are swallowed to the console so a dead logging endpoint never breaks the app.
 */
const sendLogEvent = (endpoint: string, input: LogEventInput): void => {
    const event = buildEvent(input);
    emit(event);

    fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
        keepalive: true,
    }).catch((transportError: unknown) => {
        // eslint-disable-next-line no-console -- last-resort fallback when the remote log endpoint itself is unreachable
        console.error("[Logger] Failed to deliver log event:", transportError);
    });
};

export const log = {
    debug: (message: string, context?: Record<string, unknown>): void =>
        emit(buildEvent({ level: "debug", message, context })),
    info: (message: string, context?: Record<string, unknown>): void =>
        emit(buildEvent({ level: "info", message, context })),
    warn: (message: string, context?: Record<string, unknown>, error?: unknown): void =>
        emit(buildEvent({ level: "warn", message, context, error })),
    error: (message: string, error?: unknown, context?: Record<string, unknown>): void =>
        emit(buildEvent({ level: "error", message, context, error })),
    send: sendLogEvent,
};
