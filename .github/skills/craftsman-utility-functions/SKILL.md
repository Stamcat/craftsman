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
