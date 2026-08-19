# InputPhone — Agent Usage Notes

Import:

```tsx
import { InputPhone } from "@stamcat/craftsman/InputPhone";
```

Props:

- Extends `PhoneInputProps` from `react-international-phone`.
- `label?: string | ReactNode`
- `labelPosition?: "top" | "left" | "bottom" | "right" | "inside" | "hidden"` (default: `"top"`)
- `error?: string | boolean | ReactNode`
- `required?: boolean`
- `defaultCountry?: string` (default: `"us"`)
- `preferredCountries?: string[]`
- `endAdornment?: ReactNode`

Behavior notes:

- Powered by `react-international-phone` for i18n-aware phone number formatting.
- Country selector dropdown opens below the field; ensure the container has at least 350px of vertical space.
- Use `preferredCountries` to surface commonly used countries at the top of the dropdown.

Example:

```tsx
<InputPhone
  label="Phone Number"
  defaultCountry="us"
  preferredCountries={["us", "gb", "ca"]}
  required
/>
```
