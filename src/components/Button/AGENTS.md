# Button — Agent Usage Notes

Import:

```tsx
import { Button } from "@stamcat/craftsman/Button";
```

Props:

- Inherits all native `<button>` props.
- `variant?: "primary" | "secondary" | "default" | "text"` (default: `"default"`)
- `size?: number` (default visual scale is `1`)
- `styles?: React.CSSProperties` (inline style override)

Behavior notes:

- `type` defaults to `"button"`.
- For `variant !== "default"`, variant is appended to `className` (for example `"primary"`).
- `primary` and `secondary` share a distinct filled look (blue background, white text); `default` is a base outlined look; `text` is a borderless, underline-on-hover link style.
- A `<button>` element can wrap arbitrary content (icons, custom markup, anything) purely so it stays usable by screen readers and other automated/assistive services — the native semantics and keyboard behavior come for free. Not every `<button>` should visually look like a button though, so styling is opt-in via class names rather than the bare element: base button styles (`%button-styles`) are scoped to the `.button` class the component always applies, not the bare `button` element — plain `<button>` markup without that class receives no library styling.
- `className` is preserved and merged after component classes.
- Theme component overrides are selector-based CSS emitted by `ThemeProvider`; `theme.components.*` accepts JS style objects or raw CSS/Sass strings for the target selector.
- If `children` is empty (per `isEmpty`), the component renders nothing.
- `size` is clamped to `[0.1, 10]` before styling is applied.
- When `size` is provided, Button sets a single `--btn-size` CSS variable inline; all scaling math lives in SCSS:
  - `border-radius: calc(var(--w-gutter) * 0.75 * var(--btn-size))`
  - `padding: calc(var(--w-gutter) * 0.5 * var(--btn-size)) calc(var(--w-gutter) * 0.75 * var(--btn-size))`
  - `font-size: max(10px, calc(var(--w-text) * var(--btn-size)))`
  - This is the standard sizing pattern used across the library (see `Toggle`'s `--toggle-width`): components expose one scale/size CSS variable, and SCSS does all the `calc()` work.
- There is no dedicated icon/loading prop. Icons, loaders, and mixed content are passed as `children`.
- Supports both real disable (`disabled={true}`) and style-only disable (`className="disabled"`).
- Native button modes are supported (`type="button" | "submit" | "reset"`).
- Accessibility props such as `aria-label` pass through unchanged.

Example:

```tsx
<Button variant="primary" onClick={onSave}>Save</Button>
```

Story-aligned usage examples:

```tsx
// Scaled compact button (size is clamped to [0.1, 10])
<Button variant="primary" size={0.5}>Mini Action</Button>

// Icon content
<Button variant="primary">
  <TruckIcon size={20} /> <span>Ship</span>
</Button>

// Loading content
<Button aria-label="Saving">
  <Loader type="boxy" width={32} color="#de13ca" />
</Button>

// Style-only disabled appearance while still allowing click handlers
<Button className="disabled" onClick={onClick}>Disabled Look</Button>

// Native submit behavior
<Button type="submit" aria-label="Save form">Save</Button>
```

Implementation caution:

- Size scaling depends on CSS variables provided by the package global styles (`--btn-border-radius`, `--btn-pad-y`, `--btn-pad-x`, `--w-text`).
