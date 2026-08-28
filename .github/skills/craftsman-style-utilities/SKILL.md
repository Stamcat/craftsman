---
name: craftsman-style-utilities
description: 'Styling conventions for @stamcat/craftsman — color()/width()/breakpoint() TypeScript and Sass helpers, styling expectations, and theme authoring (theme.root, theme.components, theme.widths). Use when writing styles, CSS-in-JS, Sass, or ThemeProvider theme objects for @stamcat/craftsman.'
---

# Craftsman Style Utilities

Styling rules for AI agents generating code against `@stamcat/craftsman`. For package exports, hard rules, and component contracts, see the [craftsman-component-usage skill](../craftsman-component-usage/SKILL.md). For non-styling utility functions (`isEmpty`), see the [craftsman-utility-functions skill](../craftsman-utility-functions/SKILL.md).

## Style Utilities

Craftsman provides TypeScript helpers and matching Sass functions for color, spacing, and breakpoints. Always use these instead of hard-coded values so theming and overrides work correctly.

### color()

**TypeScript** — import from `@stamcat/craftsman/styles`:

```ts
import { color, colors, hexToRgba } from "@stamcat/craftsman/styles";

// Returns var(--blue500)
color("blue500")

// Returns rgb(from var(--blue500) r g b / 0.5)
color("blue500", "rgba", 0.5)

// Fallback for environments that don't support CSS relative color syntax
hexToRgba(colors.blue500, 0.5)
```

**Sass** — import `functions` as `u`:

```scss
@use "@stamcat/craftsman/styles/utilities/functions" as u;

.element {
  color:      #{u.color(blue500)};
  background: #{u.color(black, rgba, 0.4)};
}
```

- `color(name)` → `var(--name)` — always prefer this over hard-coded hex values so theme overrides apply.
- `color(name, rgba, alpha)` → `rgb(from var(--name) r g b / alpha)` — uses CSS relative color syntax; verify browser support for your target.
- Never hard-code hex color values. Always use `color()` or a CSS variable.

### width()

**TypeScript** — import from `@stamcat/craftsman/styles`:

```ts
import { width } from "@stamcat/craftsman/styles";

width("gutter")        // var(--w-gutter, 16px)
width("gutter", 0.5)   // calc(var(--w-gutter, 16px) * 0.5)
width("column", 3)     // calc((var(--w-column) * 3) + (var(--w-gutter) * 2))
```

**Sass** — import `functions` as `u`:

```scss
@use "@stamcat/craftsman/styles/utilities/functions" as u;

.card {
  padding:   #{u.width(gutter)};
  gap:       #{u.width(gutter, 0.5)};
  max-width: #{u.width(column, 4)};
}
```

Valid keys: `text` · `gutter` · `column` · `tablet` · `desktop` · `extDesktop` · `mobileMax` · `tabletMax` · `desktopMax`

- The `column` key automatically accounts for gutters between columns.
- Never use hard-coded `px` values for spacing or layout widths. Always use `width()`.

### breakpoint()

**TypeScript** — returns a full `@media` rule string for CSS-in-JS:

```ts
import { breakpoint, media } from "@stamcat/craftsman/styles";

// Full rule — use inside styled-components, emotion, or style injection
breakpoint("desktop", "font-size: 18px;")
// => "@media (min-width: 1040px) { font-size: 18px; }"

// Raw query string only — use for conditional logic or matchMedia
media.tablet  // => "(min-width: 660px)"
```

**Sass** — `@include breakpoint(key)` wraps content in the correct `@media` query:

```scss
@use "@stamcat/craftsman/styles/utilities/functions" as u;

.sidebar {
  display: none;

  @include u.breakpoint(tablet) {
    display: block;
  }
}
```

Available breakpoint keys: `tablet` · `tabletMax` · `tabletOnly` · `desktop` · `desktopMax` · `desktopOnly` · `extDesktop` · `mobileMax` · `mobileOnly` · `mobileTablet`

- Breakpoint values come from `_config.scss` and stay in sync with any project overrides.
- Never hard-code `@media (min-width: 1040px)` or similar — always use `breakpoint()` so values stay consistent with config.

## Styling Expectations

- Components are built with SCSS modules and class-based variant hooks.
- If your app does not include this package's global CSS variable setup, visual output may differ.
- Agents should avoid hard-coding assumptions about token names beyond what the consumer app already defines.

## Custom Sizing / Scale Props

When a component accepts a numeric size/scale prop (for example `Button`'s `size` or `Toggle`'s `width`), the component sets **one** CSS custom property inline (only when the prop is provided), and the SCSS file does all the `calc()` math from there:

```tsx
// Component: only ever set the single scale variable
const sizeStyle = normalizedSize ? ({ "--btn-size": normalizedSize } as React.CSSProperties) : undefined;
```

```scss
// SCSS: give the variable a default, then derive every scaled property from it
%button-styles {
  --btn-size: 1;
  padding: calc(#{u.width(gutter, 0.5)} * var(--btn-size)) calc(#{u.width(gutter, 0.75)} * var(--btn-size));
  border-radius: calc(#{u.width(gutter, 0.75)} * var(--btn-size));
  font-size: max(10px, calc(#{u.width(text)} * var(--btn-size)));
}
```

Do not compute `calc()` strings per-property in JS/TS (for example building a `padding: "calc(... * 1.5)"` string in the component). Always push that math into SCSS and only pass the raw scale/size value through a single CSS variable.

## Theme Authoring

- `theme.root` supports JS style objects and raw CSS/Sass strings.
- `theme.components.*` supports JS style objects and raw CSS/Sass strings.
- `theme.widths` accepts a partial record of width/breakpoint keys to override the default `--w-*` CSS variables. Values are numbers in `px`.
- String component styles are applied to the mapped target selector (for example `button`, `input[type='checkbox']`).
- For multi-file Sass workflows with syntax highlighting and mixins, import compiled CSS text via `*.scss?inline`.

Valid `theme.widths` keys: `"text" | "gutter" | "column" | "tablet" | "desktop" | "extDesktop" | "mobileMax" | "tabletMax" | "desktopMax"`

Example:

```tsx
import greenRoot from "./green.root.scss?inline";
import greenButton from "./green.button.scss?inline";

export const theme = {
  widths: {
    gutter: 20,
    tablet: 768,
  },
  root: greenRoot,
  components: {
    button: greenButton,
  },
};
```
