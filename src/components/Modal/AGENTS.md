# Modal — Agent Usage Notes

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
- `styles?: React.CSSProperties` (applies to outer modal wrapper)

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
