import React, { useEffect, useState } from "react";
import type { Decorator, Preview } from "@storybook/react-vite";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { DocsContainer as BaseDocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { themes } from "storybook/theming";
import { ThemeProvider } from "../src/styles/components/ThemeProvider";
import { appThemes } from "./themes/themes";
import "../src/styles/global/globalStyles.scss"; // these aren't errors.

const withDirection: Decorator = (Story, context) => {
    const direction = context.globals.direction === "rtl" ? "rtl" : "ltr";
    return React.createElement("div", { dir: direction }, React.createElement(Story));
};

const withColorScheme: Decorator = (Story, context) => {
    const colorScheme = context.globals.colorScheme === "dark" ? "dark" : "light";
    // [data-theme="dark"] overrides live on :root-level variables (body background, etc.), so it must land on <html>, not a wrapper div nested inside body
    document.documentElement.dataset.theme = colorScheme;
    return React.createElement(React.Fragment, null, React.createElement(Story));
};

// Docs pages render their own text/headings outside any Canvas story, so withColorScheme never runs for them —
// this wraps the Docs page itself to keep its document in sync with the toolbar. useGlobals() isn't usable here
// (it's a preview hook restricted to decorators/story functions), so we listen on the raw channel instead.
const DocsContainer = ({ context, ...rest }: DocsContainerProps) => {
    const [colorScheme, setColorScheme] = useState<"light" | "dark">(() => {
        try {
            return context.getStoryContext(context.storyById()).globals.colorScheme === "dark" ? "dark" : "light";
        } catch {
            return "light";
        }
    });

    useEffect(() => {
        const handleGlobalsUpdated = ({ globals }: { globals: Record<string, unknown> }) => {
            setColorScheme(globals.colorScheme === "dark" ? "dark" : "light");
        };
        context.channel.on(GLOBALS_UPDATED, handleGlobalsUpdated);
        return () => {
            context.channel.off(GLOBALS_UPDATED, handleGlobalsUpdated);
        };
    }, [context]);

    useEffect(() => {
        document.documentElement.dataset.theme = colorScheme;
    }, [colorScheme]);

    // Our [data-theme="dark"] variables only recolor our own components — Storybook's doc chrome
    // (headings, body text, code blocks, args tables) is themed separately via this `theme` prop.
    return React.createElement(BaseDocsContainer, {
        context,
        ...rest,
        theme: colorScheme === "dark" ? themes.dark : themes.light,
    });
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
        colorScheme: {
            name: "Color scheme",
            description: "Light/dark color scheme",
            toolbar: {
                icon: "circlehollow",
                items: [
                    { value: "light", title: "Light" },
                    { value: "dark", title: "Dark" },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        direction: "ltr",
        colorScheme: "light",
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

        docs: {
            container: DocsContainer,
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
        withColorScheme,
        withThemeFromJSXProvider({
            themes: appThemes,
            defaultTheme: "default",
            Provider: ThemeProvider,
        }),
    ],
};

export default preview;
