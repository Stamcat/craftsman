---
name: craftsman-component-usage
description: 'Global AI agent guidelines for using the @stamcat/craftsman component library — package exports, hard import rules, code block rendering, Toast usage, and code generation patterns. Use when generating or reviewing code that imports from @stamcat/craftsman or needing per-component prop contracts (Button, Input, Modal, DatePicker, TimePicker, Carousel, Pagination, etc). See the craftsman-style-utilities, craftsman-utility-functions, and craftsman-device-detection skills for styling, utility function, and device detection guidance.'
---

# Craftsman Component Library Usage

Global rules for AI agents generating code against `@stamcat/craftsman`. For a specific component's props, behavior notes, and examples, open that component's `AGENTS.md` co-located with its source — see the index below. For styling utilities and theme authoring, see the [craftsman-style-utilities skill](../craftsman-style-utilities/SKILL.md). For the `isEmpty` utility and style utility parity notes, see the [craftsman-utility-functions skill](../craftsman-utility-functions/SKILL.md). For device/browser/OS detection, see the [craftsman-device-detection skill](../craftsman-device-detection/SKILL.md).

## What This Package Currently Exports

The package is built with component-level entry points only.

```tsx
import { Accordion } from "@stamcat/craftsman/Accordion";
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
import { DateTimePicker } from "@stamcat/craftsman/DateTimePicker";
import { Toggle } from "@stamcat/craftsman/Toggle";
import { Tooltip } from "@stamcat/craftsman/Tooltip";
import { Popover } from "@stamcat/craftsman/Popover";
import { Notice } from "@stamcat/craftsman/Notice";
import { SortableList } from "@stamcat/craftsman/SortableList";
```

Do not assume a root export like `@stamcat/craftsman` unless that export is explicitly added to package `exports`.

## Hard Rules for Agents

1. Never deep-import from package internals (for example `@stamcat/craftsman/src/...`). This applies to Sass too — `@use "@stamcat/craftsman/src/styles/utilities/functions"` will fail to resolve; use the published subpath `@stamcat/craftsman/styles/utilities/functions` instead.
2. Only use documented component entry points.
3. Do not import storybook files from consuming applications. Style utilities are fine to import, but only via their published subpaths (`@stamcat/craftsman/styles/utilities/functions`, `/mixins`, `/placeholders`) — never via a `/src/...` path.
4. Prefer standard React props first; use custom props only when required.

## Component Index

Each entry links to the `AGENTS.md` co-located with that component's source for props, behavior notes, and examples.

| Component | Docs |
|---|---|
| Accordion | [../../src/components/Accordion/AGENTS.md](../../src/components/Accordion/AGENTS.md) |
| Button | [../../src/components/Button/AGENTS.md](../../src/components/Button/AGENTS.md) |
| Input | [../../src/components/Input/AGENTS.md](../../src/components/Input/AGENTS.md) |
| InputPassword | [../../src/components/InputPassword/AGENTS.md](../../src/components/InputPassword/AGENTS.md) |
| Checkbox | [../../src/components/Checkbox/AGENTS.md](../../src/components/Checkbox/AGENTS.md) |
| RadioButton | [../../src/components/RadioButton/AGENTS.md](../../src/components/RadioButton/AGENTS.md) |
| Modal | [../../src/components/Modal/AGENTS.md](../../src/components/Modal/AGENTS.md) |
| Pagination | [../../src/components/Pagination/AGENTS.md](../../src/components/Pagination/AGENTS.md) |
| Carousel | [../../src/components/Carousel/AGENTS.md](../../src/components/Carousel/AGENTS.md) |
| Loader | [../../src/components/Loader/AGENTS.md](../../src/components/Loader/AGENTS.md) |
| Textarea | [../../src/components/Textarea/AGENTS.md](../../src/components/Textarea/AGENTS.md) |
| Select | [../../src/components/Select/AGENTS.md](../../src/components/Select/AGENTS.md) |
| InputPhone | [../../src/components/InputPhone/AGENTS.md](../../src/components/InputPhone/AGENTS.md) |
| DatePicker | [../../src/components/DatePicker/AGENTS.md](../../src/components/DatePicker/AGENTS.md) |
| DateRangePicker | [../../src/components/DateRangePicker/AGENTS.md](../../src/components/DateRangePicker/AGENTS.md) |
| InputNumber | [../../src/components/InputNumber/AGENTS.md](../../src/components/InputNumber/AGENTS.md) |
| TimePicker | [../../src/components/TimePicker/AGENTS.md](../../src/components/TimePicker/AGENTS.md) |
| Text | [../../src/components/Text/AGENTS.md](../../src/components/Text/AGENTS.md) |
| DateTimePicker | [../../src/components/DateTimePicker/AGENTS.md](../../src/components/DateTimePicker/AGENTS.md) |
| Tooltip | [../../src/components/Tooltip/AGENTS.md](../../src/components/Tooltip/AGENTS.md) |
| Popover | [../../src/components/Popover/AGENTS.md](../../src/components/Popover/AGENTS.md) |
| Toggle | [../../src/components/Toggle/AGENTS.md](../../src/components/Toggle/AGENTS.md) |
| Notice | [../../src/components/Notice/AGENTS.md](../../src/components/Notice/AGENTS.md) |
| SortableList | [../../src/components/SortableList/AGENTS.md](../../src/components/SortableList/AGENTS.md) |

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

## Charts (react-chartjs-2)

Craftsman uses `react-chartjs-2` directly, without modification — there is no Craftsman `Chart` wrapper component. Consumers install `react-chartjs-2` and its `chart.js` peer dependency themselves and use the upstream API exactly as documented at https://react-chartjs-2.js.org/examples.

Do this, in order, every time a chart is requested — do not stop after only picking a chart type:

1. Confirm `chart.js` and `react-chartjs-2` are installed (`npm install chart.js react-chartjs-2` if missing — do not skip this because you "can't run commands"; ask the user to run it if you truly cannot).
2. Import the chart component (`Bar`, `Line`, `Pie`, `Doughnut`, `PolarArea`, `Radar`, `Scatter`, `Bubble`, or `Chart` for mixed types) from `react-chartjs-2`.
3. Import and `ChartJS.register(...)` only the `chart.js` pieces that chart type needs, once at module scope, before any render.
4. Build a `data` object (`labels` + `datasets`) and an `options` object, then render `<ChartComponent data={data} options={options} />`.

Full minimal working example (bar chart) — use this shape as the template for any chart type:

```tsx
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register only the controllers/elements/scales/plugins the chart type needs — chart.js is tree-shakeable.
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function RevenueChart() {
    return (
        <Bar
            data={{
                labels: ["January", "February", "March"],
                datasets: [{ label: "Revenue", data: [12, 19, 8], backgroundColor: "#3A70C2" }],
            }}
            options={{ responsive: true }}
        />
    );
}
```

Usage notes:

- Every chart type used (`Bar`, `Line`, `Pie`, `Doughnut`, `PolarArea`, `Radar`, `Scatter`, `Bubble`, `Chart` for mixed types) must have its corresponding `chart.js` pieces registered once at module scope before render — a missing registration is the most common cause of a blank canvas, not a bug in the library.
- "Donut" is just the common spelling of "doughnut" — chart.js and react-chartjs-2 only export `Doughnut`, so treat a request for a "donut chart" as a request for the `Doughnut` chart type. Do not ask the user to clarify or stall on this — just use `Doughnut`.
- Dataset colors must be literal color values (hex/`rgba()`), not CSS variables (`var(--blue500)`) — chart.js draws to a `<canvas>` 2D context, which cannot resolve CSS custom properties. Use `colors` and `hexToRgba` from `@stamcat/craftsman/styles` (see the [craftsman-style-utilities skill](../craftsman-style-utilities/SKILL.md)) to stay on-palette instead of hard-coding hex strings inline.
- Storybook story files are **not published in the npm package** (excluded from the build to reduce package size) — do not look for them in `node_modules/@stamcat/craftsman`. If you are working inside the craftsman source repo itself, `src/stories/organisms/Charts.stories.tsx` has a full worked example of every chart type from the react-chartjs-2 examples page; copy the closest matching example and adapt the data. If you are in a consuming application, follow the steps and minimal example above directly instead.

## Tables (ag-grid-community)

Craftsman does not wrap `ag-grid-community`/`ag-grid-react` with a custom component. We use them directly, without modification, for advanced data visualization tables (large sortable/filterable datasets) — exactly as documented upstream at https://www.ag-grid.com/react-data-grid/.

Do this, in order, every time a table/grid is requested — do not stop after only picking column definitions:

1. Confirm `ag-grid-community` and `ag-grid-react` are installed (`npm install ag-grid-community ag-grid-react` if missing — do not skip this because you "can't run commands"; ask the user to run it if you truly cannot).
2. Call `ModuleRegistry.registerModules([AllCommunityModule])` once at module scope, before any grid renders. Without this call the grid renders blank/broken — this is expected AG Grid v33+ behavior, not a library bug.
3. Define `columnDefs` (one entry per column) and `rowData` (your array of row objects).
4. Render `<AgGridReact theme={themeQuartz} rowData={rowData} columnDefs={columnDefs} />` inside a container with an explicit height (AG Grid does not auto-size its container).
5. Only reach for Community-safe options (see below). If the request needs row grouping, pivoting, master/detail, server-side row model, or Excel export, tell the user those are AG Grid Enterprise features requiring a separate commercial license — do not silently omit the feature or stall without explanation.

Full minimal working example — use this shape as the template for any table:

```tsx
import { AllCommunityModule, ModuleRegistry, themeQuartz, type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Register only the Community module — do not register Enterprise modules without a license.
ModuleRegistry.registerModules([AllCommunityModule]);

type Product = { readonly name: string; readonly price: number };

const rowData: Product[] = [
    { name: "Trail Runner Jacket", price: 129 },
    { name: "Insulated Water Bottle", price: 32 },
];

const columnDefs: ColDef<Product>[] = [{ field: "name", filter: true }, { field: "price" }];

function ProductTable() {
    return (
        <div style={{ height: 360 }}>
            <AgGridReact<Product> theme={themeQuartz} rowData={rowData} columnDefs={columnDefs} pagination />
        </div>
    );
}
```

Import reference:

```tsx
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Register only the Community module — do not register Enterprise modules without a license.
ModuleRegistry.registerModules([AllCommunityModule]);
```

Usage:

- Only the **free Community feature set** is used/showcased in this repo: client-side sorting, filtering, pagination, row selection, cell rendering/formatting, quick filter, and CSV export.
- AG Grid also sells **Enterprise-only** features (row grouping, pivoting, master/detail, server-side row model, Excel export, and others). These require registering separate Enterprise modules and a commercial license key. Do not enable or suggest Enterprise modules unless the consumer confirms they hold an AG Grid Enterprise license — it is the consumer's responsibility to obtain and configure that license.
- Storybook story files are **not published in the npm package** (excluded from the build to reduce package size) — do not look for them in `node_modules/@stamcat/craftsman`. If you are working inside the craftsman source repo itself, `src/stories/organisms/Tables.stories.tsx` has worked Community-only examples. If you are in a consuming application, follow the steps and minimal example above directly instead.

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

1. The README now covers installation, theming, and getting-started usage; treat this skill and the per-component `AGENTS.md` files as the source of truth for deeper agent usage.
2. Theme utilities exist in source but are not guaranteed public package exports.
3. `Progress` exists in source but is incomplete and intentionally omitted from documentation for now.

## Safe Fallback Strategy for Agents

If uncertain about available exports:

1. Use only `Button`, `Checkbox`, `DatePicker`, `Input`, `InputPassword`, `InputPhone`, `Loader`, `Modal`, `RadioButton`, `Select`, `Text`, and `Textarea` from their component entry points.
2. Do not invent package APIs.
3. Prefer native HTML elements for anything not explicitly exported.
