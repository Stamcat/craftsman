# SelectWheel — Agent Usage Notes

Import:

```tsx
import { SelectWheel } from "@stamcat/craftsman/SelectWheel";
```

Props:

- `label?: string | ReactNode`
- `labelPosition?: "top" | "left" | "bottom" | "right" | "inside" | "hidden"` (default: `"top"`)
- `error?: string | boolean | ReactNode`
- `required?: boolean`
- `width?: string` — sets the field's width, accepts any CSS length e.g. `"50%"` or `"320px"`. Sets it via the `--input-width` CSS variable; omit for the default intrinsic/auto width.
- `options: Array<{ value: string; label: string }>`
- `value?: string`
- `onChange?: (value: string) => void`
- `staticLabel?: string` — optional trailing label shown next to the selected value and inside the wheel, e.g. a unit of measurement (`"pounds"`). Rendered to the DOM as `data-value-suffix` on the root element.
- `loop?: boolean` — wraps the wheel from the last option back to the first and vice versa (default: `false`).
- `disabled?: boolean`
- `name?: string` — when provided, renders a hidden input so forms can submit the selected string value.

Behavior notes:

- Functions like a dropdown: focusing or clicking the field opens a floating wheel (same `IosPickerItem` wheel used by `TimePicker`), presenting each option's `label` as a slide.
- Selecting a slide in the wheel calls `onChange` with that option's `value`.
- The field itself is a read-only text input showing the selected option's `label`, plus `staticLabel` when provided (e.g. `"180 pounds"`).
- Clicking outside the field and wheel closes it; `Enter`/`Escape` while focused also closes it.
- `options` should contain unique `value`s; the component derives the selected wheel index by matching `value` against `options`.

`IosPickerItem.tsx` wheel sizing: the centered slide is visually magnified by `translateZ(WHEEL_RADIUS)` applied on both `.ios-picker__container` and the slide itself (they compound, so effective z-depth is `2 * WHEEL_RADIUS`). A `useLayoutEffect` measures the widest slide's text width offscreen and sets `.ios-picker__viewport` to that natural width, while `.ios-picker__scene` (the untransformed `overflow: hidden` clip boundary) gets `naturalWidth * WHEEL_SCALE` so the magnified render isn't clipped. Don't revert `.ios-picker__viewport` back to `width: 100%` of `.ios-picker__scene` — that reintroduces compounding and clips/overlaps the slide again. `.ios-picker__scene` also needs `justify-content: center` so the width buffer is distributed symmetrically around the viewport.

Example:

```tsx
const [weight, setWeight] = useState("180");

<SelectWheel
  label="Weight"
  value={weight}
  onChange={setWeight}
  staticLabel="pounds"
  options={Array.from({ length: 300 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))}
/>
```
