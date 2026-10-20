# Popover — Agent Usage Notes

Import:

```tsx
import { Popover } from "@stamcat/craftsman/Popover";
```

Popover vs Tooltip — pick the right one:

- Use **Tooltip** for short hint text that appears on hover and needs no interaction.
- Use **Popover** for richer, interactive floating content (forms, menus, multi-line explanations) that the user opens deliberately. It defaults to click-to-open (not hover), supports controlled open state, and dismisses on outside click or `Escape`.

Props:

- `anchor: React.ReactNode` — the element the popover is attached to.
- `content: React.ReactNode` — the floating content shown.
- `placement?: Placement` (from `@floating-ui/react-dom`, default: `"bottom-start"`)
- `strategy?: Strategy` (from `@floating-ui/react-dom`, default: `"absolute"`)
- `trigger?: "click" | "hover"` (default: `"click"`)
- `open?: boolean` — pass to fully control open state (omit for uncontrolled behavior).
- `onOpenChange?: (open: boolean) => void` — called whenever open state would change, controlled or not.
- `anchorStyles?: React.CSSProperties`
- `contentStyles?: React.CSSProperties`

Behavior notes:

- Built on `@floating-ui/react-dom`'s `useFloating` with `autoUpdate` and `offset(12)`, `flip()`, `shift()` middleware — same positioning engine as Tooltip.
- Uncontrolled by default: pass no `open` prop and the component manages its own visibility state.
- Controlled mode: pass `open` and handle `onOpenChange` to drive visibility from parent state.
- Closes on outside `pointerdown` and on `Escape` key while open.
- Keyboard-operable: the anchor wrapper carries `role="button"`, `tabIndex={0}`, and responds to `Enter`/`Space` in addition to click, alongside `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls` — these attributes are only valid on an element with an interactive role, which is why the wrapper declares `role="button"` rather than leaving it a bare `<div>`.
- Floating content has `role="dialog"` with `aria-modal="false"` (non-modal — background stays interactive) and is only rendered in the DOM while open (not just hidden via CSS).
- Focus moves into the floating content when it opens and returns to whatever was focused beforehand when it closes.
- Current `placement` is exposed via `data-placement` on the floating element for style targeting.

Example (uncontrolled):

```tsx
<Popover
  anchor={<span>More info</span>}
  content={<div>Rich, interactive content goes here.</div>}
  placement="bottom-start"
/>
```

Example (controlled):

```tsx
const [open, setOpen] = useState(false);

<Popover
  anchor={<span>Settings</span>}
  content={<SettingsForm onSave={() => setOpen(false)} />}
  open={open}
  onOpenChange={setOpen}
/>
```

Implementation caution:

- No dedicated theme entry currently in `theme.components`; style via `anchorStyles`/`contentStyles` or global selectors targeting `.popover__anchor` / `.popover__floating`.
- Pass non-interactive content (text, icons, `<span>`/`<div>`) as `anchor` — the `.popover__anchor` wrapper is already the interactive control (`role="button"`, focusable, click/keyboard handled). Passing a `<Button>` or other focusable element as `anchor` nests an interactive element inside another, which is invalid per the ARIA spec and confuses screen readers/keyboard navigation.
