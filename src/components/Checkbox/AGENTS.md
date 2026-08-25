# Checkbox — Agent Usage Notes

Import:

```tsx
import { Checkbox } from "@stamcat/craftsman/Checkbox";
```

Props:

- Extends `Input` props.
- `type?: "checkbox"` (default: `"checkbox"`)
- `labelPosition?: "left" | "right" | "top" | "bottom"` (default: `"right"`)
- `size?: number` (default visual scale is `1`, clamped to `[0.1, 10]`)

Behavior notes:

- `Checkbox` is a thin wrapper around `Input` with checkbox-specific guardrails.
- The wrapper enforces checkbox type by default and narrows label position options to common checkbox layouts.
- Controlled and uncontrolled patterns are both supported (`checked` + `onChange`, or `defaultChecked`).
- When `size` is provided, Checkbox sets a single `--checkbox-size` CSS variable inline; the checkbox box and checkmark scale via SCSS `calc()` from that variable (same pattern as `Button`'s `--btn-size` and `Toggle`'s `--toggle-width`).

Example:

```tsx
<Checkbox
  id="accept-terms"
  name="terms"
  value="accepted"
  label="Accept terms"
  checked={accepted}
  onChange={(event) => setAccepted(event.currentTarget.checked)}
/>
```
