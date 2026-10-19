# Skeleton — Agent Usage Notes

Import:

```tsx
import { Skeleton } from "@stamcat/craftsman/Skeleton";
```

Props:

- Inherits all native `<span>` props.
- `variant?: "text" | "circle" | "rect"` (default: `"rect"`)
  - `"text"` — defaults to `width: 100%`, `height: 0.9em`, small border radius. Use for placeholder lines of copy.
  - `"circle"` — fully rounded (`border-radius: 50%`). Pair with equal `width`/`height` for avatars/icons.
  - `"rect"` — default block shape with a small border radius. Use for images, cards, buttons, etc.
- `width?: number | string` (optional; number is treated as `px`, string passes through as-is, e.g. `"100%"`)
- `height?: number | string` (same rules as `width`)
- `duration?: number` — shimmer animation duration in seconds (default: `4`). Sets `--skeleton-duration` inline.
- `style?: React.CSSProperties` (native inherited style, merged after width/height/duration)

Example:

```tsx
<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="text" width="80%" />
<Skeleton variant="rect" width="100%" height={120} duration={2} />
```

## Extensibility

Skeleton exposes its shimmer colors and timing as CSS custom properties on `.skeleton`, defaulted in `Skeleton.scss`:

- `--skeleton-duration` (default `4s`) — also settable per-instance via the `duration` prop.
- `--skeleton-base-color` (default `color("gray200")`)
- `--skeleton-highlight-color` (default `color("gray100")`)

Override colors at the theme or instance level without forking the component:

```scss
// Theme-level override (e.g. theme.components)
.skeleton {
  --skeleton-base-color: #{u.color("gray300")};
  --skeleton-highlight-color: #{u.color("gray200")};
}
```

```tsx
// Instance-level override via style
<Skeleton style={{ "--skeleton-base-color": "var(--purple200)" } as React.CSSProperties} />
```

New shapes should be added as additional `variant` values plus a matching `&--{variant}` block in `Skeleton.scss` — do not hard-code one-off shapes via `className`/inline `style` overrides when a reusable variant is the better fit.
