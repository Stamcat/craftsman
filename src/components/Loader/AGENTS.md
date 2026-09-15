# Loader — Agent Usage Notes

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
- `style?: React.CSSProperties` (native inherited style, merged after the computed loader style variables)

Example:

```tsx
<Loader type="spinner" color="var(--blue500)" width={40} aria-label="Loading" />
```
