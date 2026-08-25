# SortableList — Agent Usage Notes

Import:

```tsx
import { SortableList } from "@stamcat/craftsman/SortableList";
```

Props:

- `items: T[]`
- `getKey: (item: T, index: number) => string`
- `renderItem: (args: SortableListRenderArgs<T>) => React.ReactNode`
- `onReorder: (items: T[]) => void`
- `disabled?: boolean`
- `className?: string`
- `style?: React.CSSProperties`

Behavior notes:

- Built on `@atlaskit/pragmatic-drag-and-drop`. The list only owns drag/drop wiring and reordering — all item markup comes from `renderItem`.
- `renderItem` receives `{ item, index, isDragging, dropEdge, dragHandleRef }`.
  - By default the whole rendered item is the drag source.
  - To restrict dragging to a handle, attach `dragHandleRef` to the handle element's `ref`.
- `dropEdge` is `"top" | "bottom" | null` while another item is dragged over this one — use it to render a drop indicator, or rely on the built-in `.drop-top` / `.drop-bottom` styles.
- `onReorder` is called with the full reordered array on drop; the component does not mutate `items` itself — update your own state in the callback.
- Set `disabled` to suspend all drag/drop wiring (for example while a related request is in flight).

Example:

```tsx
const [items, setItems] = useState(["Alpha", "Beta", "Gamma"]);

<SortableList
  items={items}
  getKey={(item) => item}
  onReorder={setItems}
  renderItem={({ item, isDragging, dropEdge, dragHandleRef }) => (
    <div className={isDragging ? "dragging" : undefined} data-drop-edge={dropEdge ?? undefined}>
      <span ref={dragHandleRef}>⠿</span>
      {item}
    </div>
  )}
/>
```
