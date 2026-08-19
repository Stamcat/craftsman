# Input — Agent Usage Notes

Import:

```tsx
import { Input } from "@stamcat/craftsman/Input";
```

Props:

- Inherits native `<input>` props.
- `label?: string | ReactNode`
- `labelPosition?: "top" | "left" | "bottom" | "right" | "inside" | "hidden"` (default: `"top"`)
- `error?: string | boolean | ReactNode`
- `required?: boolean`
- `styles?: React.CSSProperties` (wrapper override)
- `type?: TextInputType` (checkbox/radio excluded)

Behavior notes:

- `id` is preserved; if omitted, a stable React `useId` value is used.
- Floating-label behavior is supported when `labelPosition="inside"`.
- `endAdornment` exists as an internal extension point used by `InputPassword`; consumer apps should prefer `InputPassword` rather than wiring password toggles on `Input`.

Example:

```tsx
<Input type="email" placeholder="you@company.com" required />
```
