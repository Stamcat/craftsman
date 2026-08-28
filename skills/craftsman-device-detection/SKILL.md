---
name: craftsman-device-detection
description: 'Device/browser detection conventions for @stamcat/craftsman — use react-device-detect instead of hand-rolled user-agent sniffing or window.innerWidth checks. Use when writing responsive logic, conditional rendering by device/browser/OS, or reviewing code that branches on viewport size or navigator.userAgent.'
---

# Craftsman Device Detection

`react-device-detect` is already a dependency of `@stamcat/craftsman` (it powers the mobile wheel-picker fallback in `TimePicker`). **Prefer it over custom implementations** for any device, browser, or OS branching logic. Consuming apps should install it directly rather than writing their own detection.

## Hard Rule

Never write custom detection logic such as:

```ts
// DO NOT — fragile, reinvents an already-solved problem
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const isMobile = window.innerWidth < 768;
```

Use the library instead:

```tsx
import { isMobile } from "react-device-detect";

if (isMobile) {
    // mobile-specific behavior
}
```

CSS media queries are still the right tool for pure layout/visual breakpoints (see the [craftsman-style-utilities skill](../craftsman-style-utilities/SKILL.md) for `breakpoint()`). Reach for `react-device-detect` when the decision depends on the actual device/browser/OS rather than viewport width alone, or when the branch happens in JS/TS rather than CSS.

## Common Named Exports

```tsx
import {
    isMobile,
    isTablet,
    isDesktop,
    isBrowser,
    isSmartTV,
    isAndroid,
    isIOS,
    isMobileOnly,
    browserName,
    osName,
    deviceType,
    BrowserView,
    MobileView,
    TabletView,
} from "react-device-detect";
```

- `isMobile` / `isTablet` / `isDesktop` / `isBrowser` — boolean flags for conditional logic.
- `isMobileOnly` — `true` for phones, `false` for tablets (use this, not `isMobile`, when tablets must be excluded).
- `browserName`, `osName`, `deviceType` — string values for logging/analytics, not for branching (prefer the boolean flags for that).
- `BrowserView` / `MobileView` / `TabletView` — declarative wrapper components that render `children` only on the matching device, as an alternative to `if (isMobile)` branches in JSX.

## Example: Conditional Rendering

```tsx
import { MobileView, BrowserView } from "react-device-detect";

<MobileView>
    <CompactNav />
</MobileView>
<BrowserView>
    <FullNav />
</BrowserView>
```

## Orientation

For portrait/landscape detection, use the `useMobileOrientation` hook rather than comparing `window.innerWidth`/`innerHeight`:

```tsx
import { useMobileOrientation } from "react-device-detect";

const { isPortrait, isLandscape } = useMobileOrientation();
```
