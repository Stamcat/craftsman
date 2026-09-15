# Textarea — Agent Usage Notes

Import:

```tsx
import { Textarea } from "@stamcat/craftsman/Textarea";
```

Props:

- Inherits all native `<textarea>` props.
- `label?: string | ReactNode`
- `labelPosition?: "top" | "left" | "bottom" | "right" | "inside" | "hidden"` (default: `"top"`)
- `error?: string | boolean | ReactNode`
- `required?: boolean`
- `style?: React.CSSProperties` — targets the wrapper element.
- `inputStyle?: React.CSSProperties` — targets the `<textarea>` field directly.
- `rows?: number`

Behavior notes:

- Shares the same `InputWrapper` as `Input` — label, error, and required behavior is identical.
- `id` is auto-generated via `useId` if not provided.

Example:

```tsx
<Textarea
  label="Your Message"
  placeholder="Type here"
  rows={4}
  required
/>
```
