# AI Agent Integration Guide for @stamcat/craftsman

This document explains how code-generation agents should use this library safely and correctly.

Full guidance has been split out for progressive loading:

- **Global guidelines** (exports, hard rules, code block rendering, style utilities, theme authoring, `isEmpty`, code gen patterns, fallback strategy): see the [craftsman-component-usage skill](.github/skills/craftsman-component-usage/SKILL.md).
- **Component-specific guidelines** (props, behavior notes, examples): each component has its own `AGENTS.md` co-located with its source, for example [src/components/Button/AGENTS.md](src/components/Button/AGENTS.md).
- **Device/browser detection** (prefer `react-device-detect` over custom user-agent/viewport checks): see the [craftsman-device-detection skill](.github/skills/craftsman-device-detection/SKILL.md).

## Quick Reference

Use these imports:

```tsx
import { Button } from "@stamcat/craftsman/Button";
import { Carousel } from "@stamcat/craftsman/Carousel";
import { Checkbox } from "@stamcat/craftsman/Checkbox";
import { DatePicker } from "@stamcat/craftsman/DatePicker";
import { DateRangePicker } from "@stamcat/craftsman/DateRangePicker";
import { Input } from "@stamcat/craftsman/Input";
import { InputNumber } from "@stamcat/craftsman/InputNumber";
import { InputPassword } from "@stamcat/craftsman/InputPassword";
import { InputPhone } from "@stamcat/craftsman/InputPhone";
import { Loader } from "@stamcat/craftsman/Loader";
import { Modal } from "@stamcat/craftsman/Modal";
import { Pagination } from "@stamcat/craftsman/Pagination";
import { RadioButton } from "@stamcat/craftsman/RadioButton";
import { Select } from "@stamcat/craftsman/Select";
import { Text } from "@stamcat/craftsman/Text";
import { Textarea } from "@stamcat/craftsman/Textarea";
import { TimePicker } from "@stamcat/craftsman/TimePicker";
```

Do not assume a root export like `@stamcat/craftsman` unless that export is explicitly added to package `exports`.

## Hard Rules for Agents

1. Never deep-import from package internals (for example `@stamcat/craftsman/src/...`).
2. Only use documented component entry points.
3. Do not import storybook files or internal style utilities from consuming applications.
4. Prefer standard React props first; use custom props only when required.


