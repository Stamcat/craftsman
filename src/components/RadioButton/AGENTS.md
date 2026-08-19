# RadioButton — Agent Usage Notes

Import:

```tsx
import { RadioButton } from "@stamcat/craftsman/RadioButton";
```

Props:

- Extends `Input` props.
- `type?: "radio"` (default: `"radio"`)
- `labelPosition?: "left" | "right"` (default: `"right"`)

Behavior notes:

- `RadioButton` is a thin wrapper around `Input` with radio-specific guardrails.
- Group behavior is native HTML radio behavior: use a shared `name` across options.
- Controlled and uncontrolled patterns are both supported (`checked` + `onChange`, or `defaultChecked`).

Example:

```tsx
<>
  <RadioButton
    id="captain-kirk"
    name="favorite-captain"
    value="Kirk"
    label="James T. Kirk"
    checked={selected === "Kirk"}
    onChange={(event) => setSelected(event.currentTarget.value)}
  />
  <RadioButton
    id="captain-picard"
    name="favorite-captain"
    value="Picard"
    label="Jean-Luc Picard"
    checked={selected === "Picard"}
    onChange={(event) => setSelected(event.currentTarget.value)}
  />
</>
```
