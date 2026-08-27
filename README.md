# @stamcat/craftsman

A lightweight, themeable React component library and design-system toolkit. Craftsman ships accessible, ready-to-style form controls, overlays, and layout primitives — plus a small set of theming and styling utilities — so you can build a consistent UI without pulling in a heavyweight framework.

- **Themeable by design** — override look and feel with a single `ThemeProvider` and CSS custom properties, no CSS-in-JS runtime required.
- **Tree-shakeable component entry points** — import only what you use (`@stamcat/craftsman/Button`, `@stamcat/craftsman/Input`, etc.).
- **React Server Component friendly** — works with Next.js App Router and other RSC setups.

📖 Full component documentation and live examples: [stamcat.github.io/craftsman](https://stamcat.github.io/craftsman)

## Installation

```bash
npm install @stamcat/craftsman
```

## Getting started

1. Import the package's global styles once at the root of your app.
2. Wrap your app in `ThemeProvider`, optionally passing a theme object to customize CSS variables.
3. Import components from their individual entry points and use them like any other React component.

```tsx
import { ThemeProvider } from "@stamcat/craftsman/styles";
import { Button } from "@stamcat/craftsman/Button";
import { Input } from "@stamcat/craftsman/Input";
import "@stamcat/craftsman/styles/globalStyles";

const appTheme = {
	root: {
		"--w-gutter": "16px",
	},
};

export default function App() {
	return (
		<ThemeProvider theme={appTheme}>
			<Input label="Name" placeholder="Jane Doe" />
			<Button>Submit</Button>
		</ThemeProvider>
	);
}
```

### RSC-safe setup

Use this pattern in React Server Component architectures (for example Next.js App Router). Render `ThemeProvider` at the root with your theme object, and import global styles once at the application root.

```tsx
import { ThemeProvider } from "@stamcat/craftsman/styles";
import "@stamcat/craftsman/styles/globalStyles";

const appTheme = {
	root: {
		"--w-gutter": "16px",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={appTheme}>{children}</ThemeProvider>
			</body>
		</html>
	);
}
```

## Available components

Each component has its own package entry point, e.g. `@stamcat/craftsman/Button`.

| Component | Entry point |
| --- | --- |
| Button | `@stamcat/craftsman/Button` |
| Carousel | `@stamcat/craftsman/Carousel` |
| Checkbox | `@stamcat/craftsman/Checkbox` |
| DatePicker | `@stamcat/craftsman/DatePicker` |
| DateRangePicker | `@stamcat/craftsman/DateRangePicker` |
| DateTimePicker | `@stamcat/craftsman/DateTimePicker` |
| Input | `@stamcat/craftsman/Input` |
| InputNumber | `@stamcat/craftsman/InputNumber` |
| InputPassword | `@stamcat/craftsman/InputPassword` |
| InputPhone | `@stamcat/craftsman/InputPhone` |
| Loader | `@stamcat/craftsman/Loader` |
| Modal | `@stamcat/craftsman/Modal` |
| Notice | `@stamcat/craftsman/Notice` |
| Pagination | `@stamcat/craftsman/Pagination` |
| Progress | `@stamcat/craftsman/Progress` |
| RadioButton | `@stamcat/craftsman/RadioButton` |
| Select | `@stamcat/craftsman/Select` |
| SortableList | `@stamcat/craftsman/SortableList` |
| Text | `@stamcat/craftsman/Text` |
| Textarea | `@stamcat/craftsman/Textarea` |
| TimePicker | `@stamcat/craftsman/TimePicker` |
| Toggle | `@stamcat/craftsman/Toggle` |
| Tooltip | `@stamcat/craftsman/Tooltip` |

## Styling notes

- `ThemeProvider` injects theme CSS variables and component override rules.
- Global styles should be loaded once at app root.
- Base defaults are emitted in the `craftsman-base` layer and theme overrides in `craftsman-theme`.
- For equal specificity, `craftsman-theme` overrides `craftsman-base`.
- `theme.components.input` targets only non-radio and non-checkbox inputs.
- `theme.root` and `theme.components.*` support JS style objects and raw CSS/Sass strings.
- For Sass file workflows, import compiled CSS text via `*.scss?inline` and pass that string into the theme object.
