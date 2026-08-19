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
