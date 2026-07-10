# AI Agent Integration Guide for @stamcat/craftsman

This document explains how code-generation agents should use this library safely and correctly.

## What This Package Currently Exports

The package is currently built with component-level entry points only.

Use these imports:

```tsx
import { Button } from "@stamcat/craftsman/Button";
import { Input } from "@stamcat/craftsman/Input";
import { Loader } from "@stamcat/craftsman/Loader";
```

Do not assume a root export like `@stamcat/craftsman` unless that export is explicitly added to package `exports`.

## Hard Rules for Agents

1. Never deep-import from package internals (for example `@stamcat/craftsman/src/...`).
2. Only use documented component entry points.
3. Do not import storybook files or internal style utilities from consuming applications.
4. Prefer standard React props first; use custom props only when required.

## Component Contracts

### Button

Import:

```tsx
import { Button } from "@stamcat/craftsman/Button";
```

Props:

- Inherits all native `<button>` props.
- `variant?: "primary" | "default" | "text"` (default: `"default"`)
- `styles?: SerializedStyles` (Emotion override)

Behavior notes:

- `type` defaults to `"button"`.
- For `variant !== "default"`, variant is appended to `className` (for example `"primary"`).

Example:

```tsx
<Button variant="primary" onClick={onSave}>Save</Button>
```

### Input

Import:

```tsx
import { Input } from "@stamcat/craftsman/Input";
```

Props:

- Pure passthrough of native `<input>` props.

Example:

```tsx
<Input type="email" placeholder="you@company.com" required />
```

### Loader

Import:

```tsx
import { Loader } from "@stamcat/craftsman/Loader";
```

Props:

- Inherits all native `<div>` props.
- `type` is required and must be one of:
  - `"dots"`
  - `"dots-trace"`
  - `"dots-bounce"`
  - `"dots-orbit"`
  - `"dashes"`
  - `"spinner"`
  - `"swirl"`
  - `"ball"`
  - `"boxy"`
  - `"factory"`
- `color?: string` (default: `"black"`)
- `width?: number` (optional, variant-dependent default behavior)
- `styles?: SerializedStyles` (Emotion override)

Example:

```tsx
<Loader type="spinner" color="var(--blue500)" width={40} aria-label="Loading" />
```

## Styling Expectations

- Components are built with Emotion and class-based variant hooks.
- If your app does not include this package's global CSS variable setup, visual output may differ.
- Agents should avoid hard-coding assumptions about token names beyond what the consumer app already defines.

## Utility Functions

### `isEmpty`

The package exports an `isEmpty` utility. **Always use it instead of writing inline empty checks.**

Import:

```ts
import { isEmpty } from "@stamcat/craftsman/utilities/validations";
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

## Code Generation Patterns to Prefer

1. Generate fully typed React usage examples.
2. Keep accessibility props in place (`aria-label`, `disabled`, semantic `type`).
3. Use `variant="primary"` for main actions and `variant="text"` for low-emphasis actions.
4. For loading states, pair `Loader` with accessible status text where needed.

## Known Limitations (Current Package State)

1. README is minimal; treat this guide as the source of truth for agent usage.
2. Theme utilities exist in source but are not guaranteed public package exports.
3. Additional components in source (for example `Progress`) may not yet be exported.

## Safe Fallback Strategy for Agents

If uncertain about available exports:

1. Use only `Button`, `Input`, and `Loader` from their component entry points.
2. Do not invent package APIs.
3. Prefer native HTML elements for anything not explicitly exported.
