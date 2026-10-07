import type { z } from "zod";
import type { LogDestinationSchema, DestinationsByLevelSchema, LogEventSchema, LogLevelSchema } from "./schemas";

export type LogLevel = z.infer<typeof LogLevelSchema>;
export type LogEvent = z.infer<typeof LogEventSchema>;
export type LogDestination = z.infer<typeof LogDestinationSchema>;
export type LogDestinationsByLevel = z.infer<typeof DestinationsByLevelSchema>;

export interface LogEventInput {
    level: LogLevel;
    message: string;
    environment?: string;
    context?: Record<string, unknown>;
    error?: unknown;
    tags?: string[];
}

export type LogDestinationHandler = (event: LogEvent) => void;
