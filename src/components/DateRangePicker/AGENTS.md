# DateRangePicker — Agent Usage Notes

Import:

```tsx
import { DateRangePicker } from "@stamcat/craftsman/DateRangePicker";
```

Props:

- Extends `DateRangePickerProps` from `@wojtekmaj/react-daterange-picker`.
- `label?: string | ReactNode`
- `labelPosition?: "top" | "left" | "bottom" | "right" | "inside" | "hidden"` (default: `"top"`)
- `error?: string | boolean | ReactNode`
- `required?: boolean`
- `id?: string`
- `style?: React.CSSProperties`
- `value?` / `onChange?` — from the underlying library; `value` is typically a `[Date, Date] | null` tuple.

Behavior notes:

- This component directly wraps `react-daterange-picker`; consult that library's docs for range-selection edge cases.
- `calendarIcon` and `clearIcon` default to `FaRegCalendar` / `FaX` but can be overridden since consumer props are spread after the defaults.
- Controlled component — parent owns `value` and `onChange`.
- Calendar flyout renders below the input; ensure the container has enough vertical space.

Example:

```tsx
const [range, setRange] = useState<[Date, Date] | null>(null);

<DateRangePicker
  label="Stay Dates"
  value={range}
  onChange={setRange}
  required
/>
```
