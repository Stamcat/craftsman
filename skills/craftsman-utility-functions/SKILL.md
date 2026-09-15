---
name: craftsman-utility-functions
description: 'Utility function conventions for @stamcat/craftsman — the isEmpty validation helper and TypeScript/Sass parity for style utility patterns. Use when writing empty/falsy checks or referencing color()/width()/breakpoint() usage patterns for @stamcat/craftsman.'
---

# Craftsman Utility Functions

Non-styling utility function rules for AI agents generating code against `@stamcat/craftsman`. For package exports, hard rules, and component contracts, see the [craftsman-component-usage skill](../craftsman-component-usage/SKILL.md). For styling and theme authoring, see the [craftsman-style-utilities skill](../craftsman-style-utilities/SKILL.md).

## `isEmpty`

The package exports an `isEmpty` utility. **Always use it instead of writing inline empty checks.**

Import:

```ts
import { isEmpty } from "@stamcat/craftsman/utilities";
```

It returns `true` for:

- `undefined`
- `null`
- empty objects — `{}`
- strings that are empty or whitespace-only — `""`, `" "`
- arrays with no elements — `[]`

Examples:

```ts
// DO — use isEmpty
if (isEmpty(value)) { ... }
if (!isEmpty(items)) { ... }

// DO NOT — write these manually
if (value === undefined || value === null) { ... }
if (typeof value === "string" && value.trim().length === 0) { ... }
if (Object.keys(obj).length === 0) { ... }
if (arr.length === 0) { ... }
```

## Other validation/formatting utilities

Also exported from `@stamcat/craftsman/utilities` (all from `src/utilities/validations.ts`):

- `validateEmail(value: string): boolean` — simple regex-based email format check.
- `getUnitLabel(locale, unit, override?): string` — resolves an `Intl.NumberFormat` unit display label, or returns `override` if provided.
- `is24HourFormat(locale): boolean` — detects whether the locale's resolved hour cycle is 24-hour (`h23`/`h24`).
- `getAmPmLabels(locale): [string, string]` — returns the locale's AM/PM strings via `Intl.DateTimeFormat`.
- `formatTime(value, locale): string` — formats a `Date` (or `DateTimePickerProps["value"]`) as a 24-hour `HH:mm` string, or `"--:--"` if not a valid `Date`.

These back the `TimePicker`/`DateTimePicker` locale-aware formatting — prefer them over hand-rolled `Intl` calls in those contexts.

## Style utilities parity (`color`, `width`, `breakpoint`)

These utility patterns exist in both TypeScript and Sass. See the [craftsman-style-utilities skill](../craftsman-style-utilities/SKILL.md) for full usage details.

TypeScript usage:

```ts
import { color, width, breakpoint } from "@stamcat/craftsman/styles";

const accent = color("blue500");
const alphaAccent = color("blue500", "rgba", 0.32);
const twoColumns = width("column", 2);
const mobileRule = breakpoint("mobileMax", "h4{font-size:14px;}");
```

Sass usage (framework source):

```scss
@use "./src/styles/utilities" as u;

.example {
  color: #{u.color(blue500)};
  background: #{u.color(blue500, rgba, 0.32)};
  max-width: #{u.width(column, 2)};
}

@include u.breakpoint(mobileMax) {
  .example { font-size: #{u.width(text)}; }
}
```
