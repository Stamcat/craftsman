# AI Agent Integration Guide for @stamcat/craftsman

This document explains how code-generation agents should use this library safely and correctly.

## What This Package Currently Exports

The package is currently built with component-level entry points only.

Use these imports:

```tsx
import { Button } from "@stamcat/craftsman/Button";
import { Checkbox } from "@stamcat/craftsman/Checkbox";
import { Input } from "@stamcat/craftsman/Input";
import { InputPassword } from "@stamcat/craftsman/InputPassword";
import { Loader } from "@stamcat/craftsman/Loader";
import { Modal } from "@stamcat/craftsman/Modal";
import { RadioButton } from "@stamcat/craftsman/RadioButton";
```

Do not assume a root export like `@stamcat/craftsman` unless that export is explicitly added to package `exports`.

## Hard Rules for Agents

1. Never deep-import from package internals (for example `@stamcat/craftsman/src/...`).
2. Only use documented component entry points.
3. Do not import storybook files or internal style utilities from consuming applications.
4. Prefer standard React props first; use custom props only when required.

## Component Contracts

### Button

Import:

```tsx
import { Button } from "@stamcat/craftsman/Button";
```

Props:

- Inherits all native `<button>` props.
- `variant?: "primary" | "default" | "text"` (default: `"default"`)
- `size?: number` (default visual scale is `1`)
- `styles?: SerializedStyles` (Emotion override)

Behavior notes:

- `type` defaults to `"button"`.
- For `variant !== "default"`, variant is appended to `className` (for example `"primary"`).
- Theme class merge: if `theme.components.button` is a string, it is appended to the class list.
- `className` is preserved and merged after variant/theme classes.
- If `children` is empty (per `isEmpty`), the component renders nothing.
- `size` is clamped to `[0.1, 10]` before styling is applied.
- When `size` is provided, Button scales:
  - `border-radius: calc(var(--btn-border-radius) * size)`
  - `padding: calc(var(--btn-pad-y) * size) calc(var(--btn-pad-x) * size)`
  - `font-size: max(10px, calc(var(--w-text) * size))`
- There is no dedicated icon/loading prop. Icons, loaders, and mixed content are passed as `children`.
- Supports both real disable (`disabled={true}`) and style-only disable (`className="disabled"`).
- Native button modes are supported (`type="button" | "submit" | "reset"`).
- Accessibility props such as `aria-label` pass through unchanged.

Example:

```tsx
<Button variant="primary" onClick={onSave}>Save</Button>
```

Story-aligned usage examples:

```tsx
// Scaled compact button (size is clamped to [0.1, 10])
<Button variant="primary" size={0.5}>Mini Action</Button>

// Icon content
<Button variant="primary">
  <TruckIcon size={20} /> <span>Ship</span>
</Button>

// Loading content
<Button aria-label="Saving">
  <Loader type="boxy" width={32} color="#de13ca" />
</Button>

// Style-only disabled appearance while still allowing click handlers
<Button className="disabled" onClick={onClick}>Disabled Look</Button>

// Native submit behavior
<Button type="submit" aria-label="Save form">Save</Button>
```

Implementation caution:

- Size scaling depends on CSS variables provided by the package global styles (`--btn-border-radius`, `--btn-pad-y`, `--btn-pad-x`, `--w-text`).

### Input

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
- `styles?: SerializedStyles` (wrapper override)
- `type?: TextInputType` (checkbox/radio excluded)

Behavior notes:

- `id` is preserved; if omitted, a stable React `useId` value is used.
- Floating-label behavior is supported when `labelPosition="inside"`.
- `endAdornment` exists as an internal extension point used by `InputPassword`; consumer apps should prefer `InputPassword` rather than wiring password toggles on `Input`.

Example:

```tsx
<Input type="email" placeholder="you@company.com" required />
```

### InputPassword

Import:

```tsx
import { InputPassword } from "@stamcat/craftsman/InputPassword";
```

Props:

- Extends `Input` props, with `type` constrained to password mode.
- Includes all label, error, required, and wrapper style props from `Input`.

Behavior notes:

- Built on top of `Input` and adds an internal password visibility state.
- Renders an in-field show/hide toggle button.
- Toggle is accessible: real button element, keyboard operable, and updates `aria-label` + `aria-pressed`.
- Use this component for password fields instead of `Input type="password"`.

Example:

```tsx
<InputPassword
  label="Password"
  placeholder="Enter your password"
  autoComplete="current-password"
/>
```

### Checkbox

Import:

```tsx
import { Checkbox } from "@stamcat/craftsman/Checkbox";
```

Props:

- Extends `Input` props.
- `type?: "checkbox"` (default: `"checkbox"`)
- `labelPosition?: "left" | "right" | "top" | "bottom"` (default: `"right"`)

Behavior notes:

- `Checkbox` is a thin wrapper around `Input` with checkbox-specific guardrails.
- The wrapper enforces checkbox type by default and narrows label position options to common checkbox layouts.
- Controlled and uncontrolled patterns are both supported (`checked` + `onChange`, or `defaultChecked`).

Example:

```tsx
<Checkbox
  id="accept-terms"
  name="terms"
  value="accepted"
  label="Accept terms"
  checked={accepted}
  onChange={(event) => setAccepted(event.currentTarget.checked)}
/>
```

### RadioButton

Import:

```tsx
import { RadioButton } from "@stamcat/craftsman/RadioButton";
```

Props:

- Extends `Input` props.
- `type?: "radio"` (default: `"radio"`)
- `labelPosition?: "left" | "right"` (default: `"right"`)

Behavior notes:

- `RadioButton` is a thin wrapper around `Input` with radio-specific guardrails.
- Group behavior is native HTML radio behavior: use a shared `name` across options.
- Controlled and uncontrolled patterns are both supported (`checked` + `onChange`, or `defaultChecked`).

Example:

```tsx
<>
  <RadioButton
    id="captain-kirk"
    name="favorite-captain"
    value="Kirk"
    label="James T. Kirk"
    checked={selected === "Kirk"}
    onChange={(event) => setSelected(event.currentTarget.value)}
  />
  <RadioButton
    id="captain-picard"
    name="favorite-captain"
    value="Picard"
    label="Jean-Luc Picard"
    checked={selected === "Picard"}
    onChange={(event) => setSelected(event.currentTarget.value)}
  />
</>
```

### Modal

Import:

```tsx
import { Modal } from "@stamcat/craftsman/Modal";
```

Props:

- Inherits all native `<div>` props.
- `visible?: boolean` (when falsy, component renders nothing)
- `onDismiss?: () => void`
- `type?: "dialog" | "panel"` (default: `"dialog"`)
- `header?: string | React.ReactNode`
- `backgroundDismiss?: boolean` (default behavior: `true`)
- `hideDismissIcon?: boolean` (default behavior: close icon is shown)
- `footer?: React.ReactNode`
- `styles?: SerializedStyles` (applies to outer modal wrapper)

Behavior notes:

- Modal is controlled; parent owns open/close state via `visible` and `onDismiss`.
- Close icon and background click both dismiss through `onDismiss`.
- Background dismiss only runs when `backgroundDismiss` is `true` or `undefined`.
- Dismiss uses a short close animation before calling `onDismiss` (~280ms timeout).
- `type="dialog"` renders centered responsive dialog sizing; `type="panel"` renders a right-side panel.
- `footer` is rendered in an action row container below modal content.

Example:

```tsx
const [open, setOpen] = useState(false);

<>
  <Button variant="primary" onClick={() => setOpen(true)}>Open</Button>
  <Modal
    visible={open}
    onDismiss={() => setOpen(false)}
    type="dialog"
    header="Confirm Action"
    footer={<><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="primary">Confirm</Button></>}
  >
    <p>Are you sure?</p>
  </Modal>
</>
```

### Loader

Import:

```tsx
import { Loader } from "@stamcat/craftsman/Loader";
```

Props:

- Inherits all native `<div>` props.
- `type` is required and must be one of:
  - `"dots"`
  - `"dots-trace"`
  - `"dots-bounce"`
  - `"dots-orbit"`
  - `"dashes"`
  - `"spinner"`
  - `"swirl"`
  - `"ball"`
  - `"boxy"`
  - `"factory"`
- `color?: string` (default: `"black"`)
- `width?: number` (optional, variant-dependent default behavior)
- `styles?: SerializedStyles` (Emotion override)

Example:

```tsx
<Loader type="spinner" color="var(--blue500)" width={40} aria-label="Loading" />
```

## Styling Expectations

- Components are built with Emotion and class-based variant hooks.
- If your app does not include this package's global CSS variable setup, visual output may differ.
- Agents should avoid hard-coding assumptions about token names beyond what the consumer app already defines.

## Utility Functions

### `isEmpty`

The package exports an `isEmpty` utility. **Always use it instead of writing inline empty checks.**

Import:

```ts
import { isEmpty } from "@stamcat/craftsman/utilities/validations";
```

It returns `true` for:

- `undefined`
- `null`
- empty objects — `{}`
- strings that are empty or whitespace-only — `""`, `" "`
- arrays with no elements — `[]`

Examples:

```ts
// DO — use isEmpty
if (isEmpty(value)) { ... }
if (!isEmpty(items)) { ... }

// DO NOT — write these manually
if (value === undefined || value === null) { ... }
if (typeof value === "string" && value.trim().length === 0) { ... }
if (Object.keys(obj).length === 0) { ... }
if (arr.length === 0) { ... }
```

## Code Generation Patterns to Prefer

1. Generate fully typed React usage examples.
2. Keep accessibility props in place (`aria-label`, `disabled`, semantic `type`).
3. Use `variant="primary"` for main actions and `variant="text"` for low-emphasis actions.
4. For loading states, pair `Loader` with accessible status text where needed.

## Known Limitations (Current Package State)

1. README is minimal; treat this guide as the source of truth for agent usage.
2. Theme utilities exist in source but are not guaranteed public package exports.
3. `Progress` exists in source but is incomplete and intentionally omitted from this guide for now.

## Safe Fallback Strategy for Agents

If uncertain about available exports:

1. Use only `Button`, `Checkbox`, `Input`, `InputPassword`, `Loader`, `Modal`, and `RadioButton` from their component entry points.
2. Do not invent package APIs.
3. Prefer native HTML elements for anything not explicitly exported.
