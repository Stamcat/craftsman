# Skeleton — Agent Usage Notes

Skeleton loaders exist to reduce Cumulative Layout Shift (CLS): they reserve the exact space the real content will occupy so nothing jumps once data loads. Always set `width`/`height` (or rely on a parent with a fixed size) to match the dimensions of the content being replaced — a skeleton that doesn't match final content size defeats the purpose and reintroduces layout shift.

This also matters for accessibility and usability beyond visual polish:
- Screen reader users get a stable, predictable DOM region instead of content reflowing underneath their focus/reading position.
- Fixed-size placeholders prevent misclicks caused by buttons/links shifting position as surrounding content loads in.

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

Match dimensions to the real content exactly (e.g. an avatar skeleton should use the same `width`/`height` as the `<img>` it replaces) so the swap from placeholder to loaded content causes zero layout shift.

## Accessibility

`Skeleton` itself renders a plain `<span>` with no ARIA semantics — apply these at the container level:

- Wrap the group of skeletons (or the region they stand in for) with `role="status"` and `aria-busy="true"` so assistive tech announces a loading state once, rather than reading each placeholder individually.
- Add `aria-hidden="true"` to individual `Skeleton` instances (or omit their content from the accessibility tree another way) — their shimmering shape has no semantic meaning and should not be announced.
- When loading completes, swap in the real content within the same container and remove `aria-busy`/`role="status"` (or move focus if the interaction requires it) rather than unmounting/remounting the whole region, to avoid an additional layout/focus jump.
- The shimmer animation respects `prefers-reduced-motion: reduce` (disabled automatically via `Skeleton.scss`) — no extra work needed for motion-sensitive users.

```tsx
<div role="status" aria-busy="true">
  <Skeleton aria-hidden="true" variant="circle" width={48} height={48} />
  <Skeleton aria-hidden="true" variant="text" width="80%" />
</div>
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
