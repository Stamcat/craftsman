import React from "react";
import type { Decorator, Preview } from "@storybook/react-vite";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "../src/styles/components/ThemeProvider";
import { appThemes } from "./themes/themes";
import "../src/styles/global/globalStyles.scss"; // these aren't errors.

const withDirection: Decorator = (Story, context) => {
    const direction = context.globals.direction === "rtl" ? "rtl" : "ltr";
    return React.createElement("div", { dir: direction }, React.createElement(Story));
};

const preview: Preview = {
    globalTypes: {
        direction: {
            name: "Direction",
            description: "Text direction",
            toolbar: {
                icon: "mirror",
                items: [
                    { value: "ltr", title: "LTR" },
                    { value: "rtl", title: "RTL" },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        direction: "ltr",
    },
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
                    "About Stamcat",
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
        withDirection,
        withThemeFromJSXProvider({
            themes: appThemes,
            defaultTheme: "default",
            Provider: ThemeProvider,
        }),
    ],
};

export default preview;
