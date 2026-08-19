# Carousel — Agent Usage Notes

Import:

```tsx
import { Carousel } from "@stamcat/craftsman/Carousel";
```

Props:

- Extends `EmblaOptionsType` from `embla-carousel`, except `slides`.
- `slides?: React.ReactNode[]`
- `className?: string`
- `style?: React.CSSProperties`
- `buttons?: boolean` (default: `true`)
- `pagination?: "dots" | "numbers"` (default: `"dots"`)

Behavior notes:

- `slides` is an array prop; do not pass slide content as `children`.
- Built on `embla-carousel-react`, so standard Embla options such as `loop`, `align`, `dragFree`, and `slidesToScroll` pass through.
- Previous/next controls are built in and can be hidden with `buttons={false}`.
- Pagination can render dots or the shared `Pagination` component in number mode.
- Number pagination uses zero-based indexes internally, consistent with `Pagination`.
- The component manages its own selected index from the Embla instance; there is no separate controlled index prop.

Example:

```tsx
const slides = [
  <figure key="one"><img src="/slide-1.jpg" alt="First slide" /></figure>,
  <figure key="two"><img src="/slide-2.jpg" alt="Second slide" /></figure>,
];

<Carousel
  slides={slides}
  loop={false}
  pagination="dots"
  align="center"
/>
```
