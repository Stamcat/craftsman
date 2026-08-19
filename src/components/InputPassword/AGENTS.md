# InputPassword — Agent Usage Notes

Import:

```tsx
import { InputPassword } from "@stamcat/craftsman/InputPassword";
```

Props:

- Extends `Input` props, with `type` constrained to password mode.
- Includes all label, error, required, and wrapper style props from `Input`.

Behavior notes:

- Built on top of `Input` and adds an internal password visibility state.
- Renders an in-field show/hide toggle button.
- Toggle is accessible: real button element, keyboard operable, and updates `aria-label` + `aria-pressed`.
- Use this component for password fields instead of `Input type="password"`.

Example:

```tsx
<InputPassword
  label="Password"
  placeholder="Enter your password"
  autoComplete="current-password"
/>
```
