export { log } from "./logger";
export { DEFAULT_LOG_DESTINATIONS_BY_LEVEL } from "./constants";
export { DestinationsByLevelSchema, LogErrorSchema, LogEventSchema, LogLevelSchema } from "./schemas";
export { setLogOutput, setLogHandler } from "./utilities";
export type {
    LogDestination,
    LogDestinationHandler,
    LogDestinationsByLevel,
    LogEvent,
    LogEventInput,
    LogLevel,
} from "./types";
