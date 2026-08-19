# Pagination — Agent Usage Notes

Import:

```tsx
import { Pagination } from "@stamcat/craftsman/Pagination";
```

Props:

- `total: number`
- `current: number`
- `showPages?: number` (default: `5`)
- `onChange: (e: React.MouseEvent<HTMLButtonElement>) => void`
- `className?: string`
- `style?: React.CSSProperties`

Behavior notes:

- Pagination is zero-based internally. Pass `current={0}` for the first page.
- `total` is the total number of pages, not the last page index.
- The component renders first/last buttons and jump-by-window buttons when needed.
- `showPages` controls both the visible window size and the jump step for `‹‹` / `››`.
- `onChange` receives the clicked button event. Read the next page from `event.currentTarget.value`.
- The active page button is disabled and marked with `aria-current="page"`.

Example:

```tsx
const [current, setCurrent] = useState(0);

<Pagination
  total={50}
  current={current}
  showPages={5}
  onChange={(event) => setCurrent(parseInt(event.currentTarget.value, 10) || 0)}
/>
```
