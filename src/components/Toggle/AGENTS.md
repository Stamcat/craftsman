# Toggle — Agent Usage Notes

Import:

```tsx
import { Toggle } from "@stamcat/craftsman/Toggle";
```

Props:

- Extends `Input` props, excluding `type`, `preAdornment`, and `endAdornment` (all internally managed).
- `width?: number` — pixel width of the switch track (default: `40`). Track height, thumb size, and thumb travel all derive from this via `calc()`.
- `label?: string | ReactNode`, `labelPosition?: "top" | "left" | "bottom" | "right" | "inside" | "hidden"` (default: `"right"`), `error?`, `required?` — same as `Input`.

Behavior notes:

- `Toggle` is `<Input type="checkbox">` under the hood — it is a real, keyboard-accessible checkbox styled as a switch, not a custom widget.
- `width` sets a single `--toggle-width` CSS variable inline; the track, thumb, and checked-state translation are all `calc()`-derived from it in `Toggle.scss` (the same sizing pattern used by `Button`'s `--btn-size`, `Checkbox`'s `--checkbox-size`, and `RadioButton`'s `--radio-size`).
- The underlying checkbox input is stretched invisibly over the full switch (`opacity: 0`) so it stays the real click/keyboard target; the visual slider is rendered via `endAdornment` with `pointer-events: none`.
- Controlled and uncontrolled patterns are both supported (`checked` + `onChange`, or `defaultChecked`).

Example:

```tsx
const [enabled, setEnabled] = useState(false);

<Toggle
  label="Enable notifications"
  width={48}
  checked={enabled}
  onChange={(event) => setEnabled(event.currentTarget.checked)}
/>
```
