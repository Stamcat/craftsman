# Tooltip — Agent Usage Notes

> Not yet part of the documented public export surface (see `craftsman-component-usage` skill's Known Limitations). Source path only — do not assume `@stamcat/craftsman/Tooltip` is published until confirmed in `exports.ts`.

Import (source-relative, once exported):

```tsx
import { Tooltip } from "@stamcat/craftsman/Tooltip";
```

Props:

- `anchor: React.ReactNode` — the element the tooltip is attached to.
- `content: React.ReactNode` — the floating content shown.
- `placement?: Placement` (from `@floating-ui/react-dom`, default: `"bottom-start"`)
- `strategy?: Strategy` (from `@floating-ui/react-dom`, default: `"absolute"`)
- `showContent?: "hover" | "click"` (default: `"hover"`)
- `anchorStyles?: React.CSSProperties`
- `contentStyles?: React.CSSProperties`

Behavior notes:

- Built on `@floating-ui/react-dom`'s `useFloating` with `autoUpdate` and `offset(12)`, `flip()`, `shift()` middleware.
- `showContent="hover"` toggles visibility on the anchor's `mouseenter`/`mouseleave`.
- `showContent="click"` toggles visibility on anchor click, and closes on any outside `pointerdown`.
- Floating content is only rendered in the DOM while visible (not just hidden via CSS).
- Current `placement` is exposed via `data-placement` on the floating element for style targeting.

Example:

```tsx
<Tooltip
  anchor={<Button variant="text">Hover me</Button>}
  content="Helpful detail"
  placement="top"
/>
```

Implementation caution:

- No dedicated theme entry currently in `theme.components`; style via `anchorStyles`/`contentStyles` or global selectors targeting `.tooltip__anchor` / `.tooltip__floating`.
