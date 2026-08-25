---
name: craftsman-component-usage
description: 'Global AI agent guidelines for using the @stamcat/craftsman component library — package exports, hard import rules, code block rendering, Toast usage, and code generation patterns. Use when generating or reviewing code that imports from @stamcat/craftsman or needing per-component prop contracts (Button, Input, Modal, DatePicker, TimePicker, Carousel, Pagination, etc). See the craftsman-style-utilities, craftsman-utility-functions, and craftsman-device-detection skills for styling, utility function, and device detection guidance.'
---

# Craftsman Component Library Usage

Global rules for AI agents generating code against `@stamcat/craftsman`. For a specific component's props, behavior notes, and examples, open that component's `AGENTS.md` co-located with its source — see the index below. For styling utilities and theme authoring, see the [craftsman-style-utilities skill](../craftsman-style-utilities/SKILL.md). For the `isEmpty` utility and style utility parity notes, see the [craftsman-utility-functions skill](../craftsman-utility-functions/SKILL.md). For device/browser/OS detection, see the [craftsman-device-detection skill](../craftsman-device-detection/SKILL.md).

## What This Package Currently Exports

The package is built with component-level entry points only.

```tsx
import { Button } from "@stamcat/craftsman/Button";
import { Carousel } from "@stamcat/craftsman/Carousel";
import { Checkbox } from "@stamcat/craftsman/Checkbox";
import { DatePicker } from "@stamcat/craftsman/DatePicker";
import { DateRangePicker } from "@stamcat/craftsman/DateRangePicker";
import { Input } from "@stamcat/craftsman/Input";
import { InputNumber } from "@stamcat/craftsman/InputNumber";
import { InputPassword } from "@stamcat/craftsman/InputPassword";
import { InputPhone } from "@stamcat/craftsman/InputPhone";
import { Loader } from "@stamcat/craftsman/Loader";
import { Modal } from "@stamcat/craftsman/Modal";
import { Pagination } from "@stamcat/craftsman/Pagination";
import { RadioButton } from "@stamcat/craftsman/RadioButton";
import { Select } from "@stamcat/craftsman/Select";
import { Text } from "@stamcat/craftsman/Text";
import { Textarea } from "@stamcat/craftsman/Textarea";
import { TimePicker } from "@stamcat/craftsman/TimePicker";
```

Do not assume a root export like `@stamcat/craftsman` unless that export is explicitly added to package `exports`.

## Hard Rules for Agents

1. Never deep-import from package internals (for example `@stamcat/craftsman/src/...`).
2. Only use documented component entry points.
3. Do not import storybook files or internal style utilities from consuming applications.
4. Prefer standard React props first; use custom props only when required.

## Component Index

Each entry links to the `AGENTS.md` co-located with that component's source for props, behavior notes, and examples.

| Component | Docs |
|---|---|
| Button | [../../../src/components/Button/AGENTS.md](../../../src/components/Button/AGENTS.md) |
| Input | [../../../src/components/Input/AGENTS.md](../../../src/components/Input/AGENTS.md) |
| InputPassword | [../../../src/components/InputPassword/AGENTS.md](../../../src/components/InputPassword/AGENTS.md) |
| Checkbox | [../../../src/components/Checkbox/AGENTS.md](../../../src/components/Checkbox/AGENTS.md) |
| RadioButton | [../../../src/components/RadioButton/AGENTS.md](../../../src/components/RadioButton/AGENTS.md) |
| Modal | [../../../src/components/Modal/AGENTS.md](../../../src/components/Modal/AGENTS.md) |
| Pagination | [../../../src/components/Pagination/AGENTS.md](../../../src/components/Pagination/AGENTS.md) |
| Carousel | [../../../src/components/Carousel/AGENTS.md](../../../src/components/Carousel/AGENTS.md) |
| Loader | [../../../src/components/Loader/AGENTS.md](../../../src/components/Loader/AGENTS.md) |
| Textarea | [../../../src/components/Textarea/AGENTS.md](../../../src/components/Textarea/AGENTS.md) |
| Select | [../../../src/components/Select/AGENTS.md](../../../src/components/Select/AGENTS.md) |
| InputPhone | [../../../src/components/InputPhone/AGENTS.md](../../../src/components/InputPhone/AGENTS.md) |
| DatePicker | [../../../src/components/DatePicker/AGENTS.md](../../../src/components/DatePicker/AGENTS.md) |
| DateRangePicker | [../../../src/components/DateRangePicker/AGENTS.md](../../../src/components/DateRangePicker/AGENTS.md) |
| InputNumber | [../../../src/components/InputNumber/AGENTS.md](../../../src/components/InputNumber/AGENTS.md) |
| TimePicker | [../../../src/components/TimePicker/AGENTS.md](../../../src/components/TimePicker/AGENTS.md) |
| Text | [../../../src/components/Text/AGENTS.md](../../../src/components/Text/AGENTS.md) |
| DateTimePicker | [../../../src/components/DateTimePicker/AGENTS.md](../../../src/components/DateTimePicker/AGENTS.md) |
| Tooltip | [../../../src/components/Tooltip/AGENTS.md](../../../src/components/Tooltip/AGENTS.md) |

Not yet part of the documented public export surface: `Progress` (source exists but is incomplete — see Known Limitations).

## Code Block Rendering

Craftsman's global styles automatically style `<code>` and `<code><pre>` elements. **Never create custom inline styles or wrapper divs to simulate a code block.** Use the native elements directly:

```tsx
// Inline code — renders with pill/badge style
<code>someValue</code>

// Block code — renders with dark background, padding, and border-radius
<code><pre>{`your
multiline
code here`}</pre></code>
```

The two modes are driven by `_code.scss`:
- `<code>` alone → light gray background, inline display
- `<code>` containing `<pre>` → dark background (`--gray800`), block display, padded and rounded

Do not create `preStyle`, `codeBlockStyle`, or equivalent inline style objects for this purpose. The global styles handle it.

## Toast (react-toastify)

Craftsman re-exports `toast` and `ToastContainer` from `react-toastify`. No custom wrapper is needed, and there is no dedicated component folder for it.

Import:

```tsx
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
```

Usage:

- Render one `<ToastContainer>` near the root of your app.
- Call `toast(...)` anywhere in response to user actions.
- `ToastContainer` props: `position`, `autoClose`, `theme` (`"light" | "dark" | "colored"`), `closeOnClick`, `pauseOnHover`, `draggable`, `newestOnTop`.

Example:

```tsx
// Root layout
<ToastContainer position="bottom-right" autoClose={3000} theme="light" />

// Anywhere in the app
toast("Saved successfully!");
toast.error("Something went wrong.");
toast.success("Profile updated.");
toast.warning("Unsaved changes.");
toast.info("New version available.");
```

## Code Generation Patterns to Prefer

1. Generate fully typed React usage examples.
2. Keep accessibility props in place (`aria-label`, `disabled`, semantic `type`).
3. Use `variant="primary"` for main actions and `variant="text"` for low-emphasis actions.
4. For loading states, pair `Loader` with accessible status text where needed.
5. **Functional component declaration order** — always organize the body in this sequence:
   1. Hook calls (`useSomething`)
   2. State (`useState`)
   3. Derived state / variables (values computed from state or props)
   4. Action handlers (`const handle*`, `const dispatch*`, `useEffect`)

## Known Limitations (Current Package State)

1. README is minimal; treat this skill and the per-component `AGENTS.md` files as the source of truth for agent usage.
2. Theme utilities exist in source but are not guaranteed public package exports.
3. `Progress` exists in source but is incomplete and intentionally omitted from documentation for now.

## Safe Fallback Strategy for Agents

If uncertain about available exports:

1. Use only `Button`, `Checkbox`, `DatePicker`, `Input`, `InputPassword`, `InputPhone`, `Loader`, `Modal`, `RadioButton`, `Select`, `Text`, and `Textarea` from their component entry points.
2. Do not invent package APIs.
3. Prefer native HTML elements for anything not explicitly exported.
