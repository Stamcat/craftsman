# TimePicker — Agent Usage Notes

Import:

```tsx
import { TimePicker } from "@stamcat/craftsman/TimePicker";
```

Props:

- Extends `TimePickerProps` from `react-time-picker`, excluding its `locale` and `format` props.
- `label?: string | ReactNode`
- `labelPosition?: "top" | "left" | "bottom" | "right" | "inside" | "hidden"` (default: `"top"`)
- `error?: string | boolean | ReactNode`
- `required?: boolean`
- `locale?: Intl.LocalesArgument`
- `format?: 24 | 12`
- `labels?: { hour?: string; minute?: string }`

Behavior notes:

- The component uses a custom wheel UI instead of the stock `react-time-picker` clock popup.
- `value` is typically a time string such as `"09:30"`; pair it with `onChange` for interactive controlled usage.
- If a `value` is provided without `onChange`, treat the picker as effectively read-only.
- Focusing the input opens the wheel, and the trailing toggle button shows or hides it explicitly.
- The trailing toggle button mirrors the field's `disabled` prop — when `disabled` is set, the toggle is disabled too.
- Clicking outside the field and wheel closes the wheel.
- `locale` defaults to the browser locale when omitted and affects time formatting and wheel labels.
- When `name` is provided, the component renders a hidden input so forms can submit the selected string value.

Example:

```tsx
const [time, setTime] = useState("09:30");

<TimePicker
  label="Appointment Time"
  value={time}
  onChange={(value) => setTime(value ?? "")}
  format={24}
/>
```
