# Checkbox — Agent Usage Notes

Import:

```tsx
import { Checkbox } from "@stamcat/craftsman/Checkbox";
```

Props:

- Extends `Input` props.
- `type?: "checkbox"` (default: `"checkbox"`)
- `labelPosition?: "left" | "right" | "top" | "bottom"` (default: `"right"`)

Behavior notes:

- `Checkbox` is a thin wrapper around `Input` with checkbox-specific guardrails.
- The wrapper enforces checkbox type by default and narrows label position options to common checkbox layouts.
- Controlled and uncontrolled patterns are both supported (`checked` + `onChange`, or `defaultChecked`).

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
