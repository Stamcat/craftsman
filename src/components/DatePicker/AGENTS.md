# DatePicker — Agent Usage Notes

Import:

```tsx
import { DatePicker } from "@stamcat/craftsman/DatePicker";
```

Props:

- Extends `DatePickerProps` from `react-date-picker`.
- `label?: string | ReactNode`
- `labelPosition?: "top" | "left" | "bottom" | "right" | "inside" | "hidden"` (default: `"top"`)
- `error?: string | boolean | ReactNode`
- `required?: boolean`
- `value?: Date | null`
- `onChange?: (value: DatePickerProps["value"]) => void`

Behavior notes:

- Controlled component — parent owns `value` and `onChange`.
- Calendar flyout renders below the input; ensure the container has at least 400px of vertical space.
- Use `useState` to manage the selected date value.

Example:

```tsx
const [date, setDate] = useState<Date | null>(null);

<DatePicker
  label="Appointment Date"
  value={date}
  onChange={setDate}
  required
/>
```
