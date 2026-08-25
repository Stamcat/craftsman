# Notice — Agent Usage Notes

Import:

```tsx
import { Notice } from "@stamcat/craftsman/Notice";
```

Props:

- Inherits all native `<div>` props.
- `type?: "help" | "info" | "success" | "error" | "none"` (default: `"info"`; `"none"` hides the leading status icon container)
- `icon?: React.ReactNode` (overrides the default status icon for the given `type`)
- `title?: string | React.ReactNode`
- `message?: string | React.ReactNode`
- `children?: React.ReactNode` (rendered alongside `title`/`message`)
- `buttons?: React.ReactNode` (rendered in a footer action row)
- `dismissible?: boolean` (shows a close ("x") button)
- `visible?: boolean` (default: `true`; renders nothing when `false`)
- `onDismiss?: (id?: string) => void`
- `id?: string` (passed back to `onDismiss`)

Behavior notes:

- Notice is an inline, persistent alert banner — not a popup toast. For transient popup notifications use the existing `react-toastify` integration (see the "Molecules/Toast" story), not this component.
- Notice is not self-dismissing — the dismiss button only calls `onDismiss`; the parent owns visibility and must flip `visible` to `false` (or unmount) in response.
- `title` is wrapped in `<Text as="h5">` and `message` in `<Text as="span">` when passed as a string; `React.ReactNode` values are rendered as-is.
- The leading icon inherits its color via CSS (`currentColor`) from the `.notice.<type>` class — don't pass an explicit `fill`/`color` prop to override it, use `icon` to swap the element instead.

Example:

```tsx
<Notice
  type="error"
  title="Something went wrong"
  message="Please check the highlighted fields and try again."
  dismissible
  visible={visible}
  onDismiss={() => setVisible(false)}
  buttons={<Button variant="text" onClick={retry}>Retry</Button>}
/>
```
