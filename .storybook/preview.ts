import type { Preview } from "@storybook/react-vite";
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from "../src/styles/components/ThemeProvider";
import { appThemes } from "./themes/themes";
import "../src/styles/global/globalStyles";

const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                order: [
                    "Introduction",
                    "Getting Started",
                    "Themes",
                    "Quarks",
                    "Atoms",
                    "Molecules",
                    "Organisms",
                    "Templates",
                    "Utilities",
                    "*",
                    "To Do",
                ],
                method: "alphabetical",
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo",
        },
    },
    decorators: [
        withThemeFromJSXProvider({
            themes: appThemes,
            defaultTheme: "default",
            Provider: ThemeProvider,
        }),
    ],
};

export default preview;
