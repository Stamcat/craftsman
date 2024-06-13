import type { Preview } from '@storybook/react';
// import { withThemeFromJSXProvider } from '@storybook/addon-themes';

const preview: Preview = {
    globalTypes: {
        theme: { type: 'string' },
        },
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        },
        options: {
        storySort: {
            method: "alphabetical",
            order: ['Introduction', "Quarks", "Atoms", '*'],
        },
        },
    },
    // Theme implementation for Storybook
    decorators: [
    //     (withThemeFromJSXProvider as any)({
    //         themes,
    //         defaultTheme: "public",
    //         Provider: ThemeProvider,
    //         GlobalStyles, // Adds your GlobalStyle component to all stories
    //     }),
    ],
};

export default preview;
