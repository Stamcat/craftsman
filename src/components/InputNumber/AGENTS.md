# InputNumber — Agent Usage Notes

Import:

```tsx
import { InputNumber } from "@stamcat/craftsman/InputNumber";
```

Props:

- Extends `Input` props (`Omit<InputProps, "type" | "endAdornment">`).
- `type?: "number"` (fixed, default: `"number"`)
- `onDecrement?: (e: React.MouseEvent<HTMLButtonElement>) => void`
- `onIncrement?: (e: React.MouseEvent<HTMLButtonElement>) => void`
- `iconIncrement?: React.ReactNode` — overrides the icon rendered in the increment button.
- `iconDecrement?: React.ReactNode` — overrides the icon rendered in the decrement button.

Behavior notes:

- Renders an `Input` with a decrement button as `preAdornment` and an increment button as `endAdornment`.
- Clicking a button calls the native `stepDown()` / `stepUp()` on the underlying `<input type="number">` (honoring `min`, `max`, and `step`), then dispatches a native `input` event so a controlled `onChange` fires exactly like a real number input's spinner.
- `onDecrement` / `onIncrement` are optional callbacks invoked after the native step — they do not replace `value`/`onChange` control.
- Use standard controlled `<input type="number">` patterns (`value` + `onChange`) to own the number's state.

Example:

```tsx
const [count, setCount] = useState(0);

<InputNumber
  label="Quantity"
  value={count}
  min={0}
  max={10}
  onChange={(e) => setCount(Number(e.currentTarget.value))}
/>
```
