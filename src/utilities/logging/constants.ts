import type { LogDestination, LogLevel } from "./types";

// "console" is the built-in destination, active for every level by default. Omit it from a
// level's array (via setLogOutput) to suppress console
// output for that level, e.g. silencing debug/info in production while keeping warn/error.
export const DEFAULT_LOG_DESTINATIONS_BY_LEVEL: Record<LogLevel, LogDestination[]> = {
    debug: ["console"],
    info: ["console"],
    warn: ["console"],
    error: ["console"],
};

export const CONSOLE_METHOD: Record<LogLevel, "debug" | "info" | "warn" | "error"> = {
    debug: "debug",
    info: "info",
    warn: "warn",
    error: "error",
};
