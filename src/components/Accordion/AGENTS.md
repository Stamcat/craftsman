# Accordion — Agent Usage Notes

Import:

```tsx
import { Accordion } from "@stamcat/craftsman/Accordion";
```

Props:

- `items: { id?: string; header: ReactNode; content: ReactNode; disabled?: boolean }[]` — required, data-driven like `Select`'s `options`.
- `multiple?: boolean` (default: `false`) — when `false`, opening an item closes any other open item.
- `expanded?: string[]` — controlled set of open item ids. Omit to let Accordion manage its own open/closed state.
- `defaultExpanded?: string[]` (default: `[]`) — initial open item ids when uncontrolled.
- `onChange?: (expanded: string[]) => void`
- Inherits all native `<div>` props (except `onChange`, which is overridden above).

Behavior notes:

- Each item renders as an `<h3>` heading wrapping a `<button>` trigger (`aria-expanded`, `aria-controls`) and a `role="region"` panel (`aria-labelledby`) — the WAI-ARIA Accordion pattern.
- Collapsed panels are hidden via the native `hidden` attribute (not just visually), so screen readers skip their content.
- The chevron icon is `FaAngleUp` from `react-icons/fa6`; it rotates 180deg when collapsed and un-rotates to point up when expanded — the same rotate-on-open treatment used for `Select`'s native dropdown arrow.
- Keyboard support mirrors a native `<select>`: `Tab` moves focus in/out, `Enter`/`Space` toggle the focused header (free via native `<button>` semantics), and `ArrowUp`/`ArrowDown`/`Home`/`End` move focus between headers without opening them.
- `disabled` items render a disabled `<button>` (`aria-disabled` is implied by the native `disabled` attribute) and cannot be toggled.
- If `id` is omitted per item, one is derived from `useId()` plus the item's index.
- Renders nothing (per `isEmpty`) if `items` is empty.

Example:

```tsx
<Accordion
  items={[
    { id: "shipping", header: "Shipping", content: <p>Ships in 3-5 business days.</p> },
    { id: "returns", header: "Returns", content: <p>30-day return window.</p> },
  ]}
/>
```

Controlled usage:

```tsx
const [expanded, setExpanded] = useState<string[]>(["shipping"]);

<Accordion items={items} expanded={expanded} onChange={setExpanded} multiple />
```
