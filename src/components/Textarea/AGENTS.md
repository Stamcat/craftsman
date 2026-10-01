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
- `inputClassName?: string` — adds a className to the `<textarea>` field directly (alongside the base `"input"` class).
- `labelStyle?: React.CSSProperties` — targets the wrapping `<label>` element.
- `labelClassName?: string` — adds a className to the wrapping `<label>` element.
- `width?: string` — sets the field's width, accepts any CSS length e.g. `"50%"` or `"320px"`. Sets it via the `--input-width` CSS variable; omit for the default intrinsic/auto width.
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

```tsx
<Textarea label="Notes" width="100%" />
```
