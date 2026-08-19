# DateTimePicker — Agent Usage Notes

> Not yet part of the documented public export surface (see `craftsman-component-usage` skill's Known Limitations). Source path only — do not assume `@stamcat/craftsman/DateTimePicker` is published until confirmed in `exports.ts`.

Import (source-relative, once exported):

```tsx
import { DateTimePicker } from "@stamcat/craftsman/DateTimePicker";
```

Props:

- Extends `react-datetime-picker`'s `DateTimePickerProps` plus `LabeledInput` (`label`, `labelPosition`, `error`, `required`).
- `id?: string`
- `style?: React.CSSProperties`
- `format?: 24 | 12` — hour format used by the custom time wheel display.
- `labels?: { hour?: string; minute?: string }` — labels passed through to the time wheel.
- `value` / `onChange` — standard `Date` value and change callback.

Behavior notes:

- Directly wraps `react-datetime-picker`, but replaces its native clock UI with the custom `TimePickerDisplay` wheel (shared with `TimePicker`); `isClockOpen` is always forced `false` on the underlying component.
- Clicking/focusing a time sub-field opens the custom wheel only if `value` is already a valid `Date`. If no date is selected yet, focus is redirected to the date field so the calendar opens instead of the time wheel.
- Clicking outside the wrapper (`pointerdown`) closes the time wheel.
- Opening the calendar (`onCalendarOpen`) closes the time wheel so both widgets are never open simultaneously.
- `onChangeTime` builds the resulting `Date` from the existing `value` if present, otherwise from `new Date()` (today), then sets hours/minutes on it before calling `onChange`.

Example:

```tsx
<DateTimePicker
  label="Appointment"
  value={value}
  onChange={setValue}
  format={12}
/>
```

Implementation caution:

- Relies on `react-datetime-picker`'s rendered sub-input `name` attributes (`day`/`month`/`year` vs `hour12`/`hour24`/`minute`/`second`/`amPm`) to distinguish date vs. time fields for the focus-redirect behavior. Upgrading `react-datetime-picker` may require re-verifying these names.
