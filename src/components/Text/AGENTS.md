# Text — Agent Usage Notes

Import:

```tsx
import { Text } from "@stamcat/craftsman/Text";
```

Props:

- Inherits all native HTML element props.
- `as?: TextTags` — HTML tag to render (default: `"div"`)
- `richText?: boolean` — when `true`, renders sanitized HTML from a string `children` value (always renders as `<div>`)
- `type?: TextType` — **deprecated, legacy support only** — overrides base type styling (e.g. `"display"`, `"heading"`)
- `size?: TextSize` — overrides base size styling
- `alignment?: "center" | "left" | "right"` — **deprecated, legacy support only** — text-align shorthand

Behavior notes:

- Uses global HTML5 tag declarations by default; `type` and `size` override base styling.
- `richText` mode sanitizes HTML via DOMPurify. Always pass a string as `children` in this mode.
- Prefer semantic HTML5 tags via `as` over using `type`/`size` overrides.
- Prefer plain semantic HTML5 elements (`<p>`, `<h1>`-`<h6>`, `<span>`, etc.) over `Text` for ordinary static content. Reach for `Text` primarily when rendering rich text from a CMS (`richText` mode).
- Do not use `type` or `alignment` — both are deprecated and exist only for legacy support.

Example:

```tsx
// Semantic heading
<Text as="h2">Section Title</Text>

// Sanitized rich text from a CMS
<Text richText>{'<p><strong>Hello</strong> world</p>'}</Text>
```
