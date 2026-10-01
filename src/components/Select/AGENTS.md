# Select — Agent Usage Notes

Import:

```tsx
import { Select } from "@stamcat/craftsman/Select";
```

Props:

- Inherits all native `<select>` props.
- `label?: string | ReactNode`
- `labelPosition?: "top" | "left" | "bottom" | "right" | "inside" | "hidden"` (default: `"top"`)
- `error?: string | boolean | ReactNode`
- `required?: boolean`
- `style?: React.CSSProperties` — targets the wrapper element.
- `inputStyle?: React.CSSProperties` — targets the `<select>` field directly.
- `width?: string` — sets the field's width, accepts any CSS length e.g. `"50%"` or `"320px"`. Sets it via the `--input-width` CSS variable; omit for the default intrinsic/auto width.
- `options?: Array<{ label: string; value: string }>`

Behavior notes:

- Built on the native `<select>` element via `InputWrapper`.
- Pass options as a plain array — do not render `<option>` children manually.
- `id` is auto-generated via `useId` if not provided.

Example:

```tsx
<Select
  label="Favorite Fruit"
  required
  options={[
    { value: "", label: "Select one..." },
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
  ]}
/>
```
