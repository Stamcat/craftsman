# @stamcat/craftsman

Craftsman design system components and styling utilities.

## Installation

```bash
npm install @stamcat/craftsman
```

## RSC-safe setup

Use this pattern in React Server Component architectures (for example Next.js App Router):

1. Import package global styles once at the application root.
2. Render `ThemeProvider` at the root with your theme object.

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

## Component imports

Use component entry points:

```tsx
import { Button } from "@stamcat/craftsman/Button";
import { Input } from "@stamcat/craftsman/Input";
import { Modal } from "@stamcat/craftsman/Modal";
```

## Styling notes

- `ThemeProvider` injects theme CSS variables and component override rules.
- Global styles should be loaded once at app root.
