import type { Preview } from "@storybook/react-vite";
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { Global, css } from '@emotion/react';
import { globalStyles } from "../src/styles/global/globalStyles";
import { themes, type Theme } from "../src/styles/themes";

function buildThemeOverride(theme: Theme) {
    const vars = Object.entries(theme).map(([k, v]) => k + ": " + v + ";").join(" ");
    return css(":root { " + vars + " }");
}

// eslint-disable-next-line react-refresh/only-export-components
const GlobalStyles = ({ theme }: { theme?: Theme }) => (
  <>
    <Global styles={globalStyles} />
    {theme && <Global styles={buildThemeOverride(theme)} />}
  </>
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
            themes,
            defaultTheme: "default",
            GlobalStyles,
        }),
    ],
};

export default preview;
