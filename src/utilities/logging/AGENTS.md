# Agent Instructions — utilities/logging

This folder is backend-agnostic logging library code, local to `@stamcat/craftsman`
and published via the package's `./utilities` subpath export. Nothing in here may import or
reference a specific logging backend (Splunk or otherwise) by name.

## Using the logger

Import `log` from `@stamcat/craftsman/utilities` (or `./logging`/`./logging/logger`
via relative path from elsewhere in this repo) and call it instead of `console.*`:

```ts
import { log } from "@stamcat/craftsman/utilities";

log.debug("message", context?);
log.info("message", context?);
log.warn("message", context?, error?);
log.error("message", error?, context?);
log.send(endpoint, { level, message, context?, error?, tags? }); // fire-and-forget POST to a remote endpoint
```

`"console"` is a built-in destination, active for every level by default — the sanctioned
`console.*` boundary lives in `logger.ts`, don't add another one. Each call is routed to whatever
destinations (console and/or backends) are configured for that level; see below for suppressing
console output per level.

Every event is redacted for PII (see `redact.ts`) before it reaches *any* destination — this isn't
something callers or backend integrations opt into or need to repeat.

## Wiring up a backend (e.g. Splunk)

A backend integration is NOT library code — it lives in the consuming app (outside this package)
and plugs into the library through `./utilities.ts`, also re-exported from `@stamcat/craftsman/utilities`:

- `setLogHandler(destination, handler)` — registers a `(event: LogEvent) => void`
  handler under a destination name. The library never hardcodes backend destination names
  (`"console"` is the one built-in exception, registered internally by `logger.ts`).
- `setLogOutput(overrides?)` — call at app startup to establish routing, and again
  later (e.g. from a feature-flag saga) to change it without a redeploy. Levels omitted from
  `overrides` reset to the built-in default; call with no argument to reset everything to defaults.
- `DestinationsByLevelSchema` (also re-exported from `@stamcat/craftsman/utilities`)
  — the Zod schema `overrides` must satisfy; use it to validate remote config (e.g. a feature flag
  payload) before passing it to `setLogOutput`.

Do not add a backend's name as a literal anywhere in `logging/` (schemas, types, constants,
logger) — `"console"` is the sole exception, since console is built into this library rather than
a consuming app's backend. If you need a new backend-driven behavior, add the generic hook here
and implement the specifics in the consuming app, outside this package.

## Suppressing console output per level

`"console"` is included in every level's array in `DEFAULT_LOG_DESTINATIONS_BY_LEVEL`, so console
logging is on by default. To silence it for specific levels (e.g. `debug`/`info` in production)
while keeping it for others, omit `"console"` from that level's array — an empty array (or one
listing only backend destinations) means console is skipped for that level:

```ts
import { setLogOutput } from "@stamcat/craftsman/utilities";

// Suppress console for debug/info in production; warn/error keep their default (console).
setLogOutput({ debug: [], info: [] });
```

## Redacting PII

`buildEvent` in `logger.ts` runs `message`, `context` (recursively), and `error.message`/`error.stack`
through `redactContext`/`redactText` in `redact.ts` before the event is validated or dispatched to any
destination. This is the one sanctioned redaction boundary — it happens before `emit()`, so console and
every registered backend handler only ever see the redacted event; no destination-specific code needs to
redact anything itself. `redact.ts` redacts by context key name (e.g. `email`, `token`, `ssn`) and by
scanning string values for common PII shapes (email, phone, SSN, credit card). Extend the patterns there
if a new PII shape needs covering — don't add redaction logic anywhere else.

## File responsibilities

- `types.ts` — types derived from `schemas.ts`, plus `LogEventInput`/`LogDestinationHandler`.
- `schemas.ts` — Zod schemas (`LogLevelSchema`, `LogErrorSchema`, `LogEventSchema`, `LogDestinationSchema`,
  `DestinationsByLevelSchema`), all re-exported from `@stamcat/craftsman/utilities` so
  consuming apps can validate their own payloads against the same shapes. `LogDestinationSchema` is a
  generic non-empty string, not an enum of known backends.
- `constants.ts` — plain data only (`DEFAULT_LOG_DESTINATIONS_BY_LEVEL`, `CONSOLE_METHOD`). No
  functions — see `utilities.ts` for those.
- `redact.ts` — PII redaction applied to every log event before dispatch (see above).
- `utilities.ts` — the destination-routing and handler-registry functions described above.
- `logger.ts` — registers the built-in console destination handler, builds/validates `LogEvent`s,
  and dispatches to registered destination handlers for the event's level.
- `index.ts` — the barrel re-exported by `src/utilities/index.ts` (and therefore by the package's
  `./utilities` subpath export). Export any new public symbol here, not just from `logger.ts`.

## Adding new fields to a log event

Update `LogEventSchema`/`LogErrorSchema` in `schemas.ts` first (source of truth), then the derived
types in `types.ts` follow automatically via `z.infer`. Don't hand-write a type that duplicates a
schema.
