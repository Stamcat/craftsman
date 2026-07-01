import type { Preview } from "@storybook/react-vite";
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { Global } from '@emotion/react';
import { themeBuilder, CraftsmanThemeProvider } from "../src/styles/theme/theme";
import type { Theme } from "../src/styles/theme/types";
import { appThemes } from "./themes/themes";
import { globalStyles } from "../src/styles/global/globalStyles";

// TODO: This needs to be included in package 
// eslint-disable-next-line react-refresh/only-export-components
const GlobalStyles = () => (
    <Global
        styles={(theme) => [globalStyles, themeBuilder(theme as Theme)]}
    />
);

const preview: Preview = {
    parameters: {
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
            Provider: CraftsmanThemeProvider,
            GlobalStyles,
        }),
    ],
};

export default preview;
