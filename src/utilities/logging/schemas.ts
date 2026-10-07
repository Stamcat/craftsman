import { z } from "zod";

export const LogLevelSchema = z.enum(["debug", "info", "warn", "error"]);

export const LogErrorSchema = z.object({
    name: z.string(),
    message: z.string(),
    stack: z.string().nullable().default(null),
});

// Standardized shape for every log event, whether it only hits the console or is
// also forwarded to a remote logging endpoint (see logger.ts).
export const LogEventSchema = z.object({
    level: LogLevelSchema,
    message: z.string(),
    timestamp: z.string(),
    environment: z.string().nullable().default(null),
    context: z.record(z.string(), z.unknown()).nullable().default(null),
    tags: z.array(z.string()).default([]),
    error: LogErrorSchema.nullable().default(null),
});

// A destination is just an identifier a backend registers itself under (configured by the
// consuming app) — the library has no concept of which backends exist.
export const LogDestinationSchema = z.string().min(1);

// Shape of the remote config (e.g. a feature flag) that overrides which destinations
// each log level forwards to, on top of whatever defaults the host app configured.
export const DestinationsByLevelSchema = z.object({
    debug: z.array(LogDestinationSchema).optional(),
    info: z.array(LogDestinationSchema).optional(),
    warn: z.array(LogDestinationSchema).optional(),
    error: z.array(LogDestinationSchema).optional(),
});
