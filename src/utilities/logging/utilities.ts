import type { LogDestination, LogDestinationHandler, LogDestinationsByLevel, LogLevel } from "./types";
import { DEFAULT_LOG_DESTINATIONS_BY_LEVEL } from "./constants";

let logDestinationsByLevel: Record<LogLevel, LogDestination[]> = DEFAULT_LOG_DESTINATIONS_BY_LEVEL;

export const getLogDestinationsByLevel = (): Record<LogLevel, LogDestination[]> => logDestinationsByLevel;

// Called by the host app (e.g. once at startup, or later from a feature-flag saga) to tune which
// destinations each level routes to. Levels omitted from `overrides` keep the built-in default.
// Call with no argument to reset everything back to the built-in defaults.
export const setLogOutput = (overrides?: LogDestinationsByLevel): void => {
    logDestinationsByLevel = { ...DEFAULT_LOG_DESTINATIONS_BY_LEVEL, ...overrides };
};

const logDestinations = new Map<LogDestination, LogDestinationHandler>();

// Lets a backend module register itself under a destination name without logger.ts
// importing that backend directly.
export const setLogHandler = (destination: LogDestination, handler: LogDestinationHandler): void => {
    logDestinations.set(destination, handler);
};

export const getLogDestination = (destination: LogDestination): LogDestinationHandler | undefined =>
    logDestinations.get(destination);
