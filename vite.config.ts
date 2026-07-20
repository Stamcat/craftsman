/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { EXPORTS } from "./exports";
import { playwright } from "@vitest/browser-playwright";

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export const ENTRIES = Object.fromEntries(
    Object.entries(EXPORTS).map(([key, value]) => [key, path.resolve(__dirname, `src/${value}/index.ts`)]),
);
// Configuration for type declarations
const dtsOptions = {
    include: ["src"],
    exclude: ["src/stories/**/*", "src/**/*.stories.*", "src/**/*.mdx", "scripts/**/*"],
    outDir: "dist",
    insertTypesEntry: true,
    rollupTypes: true,
    // entryRoot: "." mirrors the full src/ path into dist/ (e.g. dist/src/components/Button.d.ts)
    entryRoot: ".",
};
// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [react(), dts(dtsOptions), libInjectCss()],
    build: {
        copyPublicDir: false,
        lib: {
            // entry: resolve(__dirname, 'src/main.ts'), // Your library's entry file
            entry: ENTRIES,
            name: "Craftsman", // Global variable name for UMD builds
            formats: ["es"],
            // fileName: (format) => `my-library.${format}.js`, // Output file name
        },
        rollupOptions: {
            // Externalize dependencies that should not be bundled
            external: [
                "react",
                "react-dom",
                "zod",
                "react/jsx-runtime",
                /^@emotion\/cache(\/.*)?$/,
                /^react-icons(\/.*)?$/,
                "@emotion/react",
                "@emotion/styled",
                "emotion",
                "dompurify",
                "react-international-phone",
                "react-date-picker",
                "react-datetime-picker",
                "react-toastify",
                "sass-embedded",
                /^next(\/.*)?$/,
            ],
            output: {
                entryFileNames: "[name].[format].js",
                preserveModules: true,
                preserveModulesRoot: ".",
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    zod: "zod",
                },
            },
        },
    },
    test: {
        projects: [
            {
                extends: true,
                plugins: [
                    // The plugin will run tests for the stories defined in your Storybook config
                    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                    storybookTest({
                        configDir: path.join(dirname, ".storybook"),
                    }),
                ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [
                            {
                                browser: "chromium",
                            },
                        ],
                    },
                    setupFiles: [".storybook/vitest.setup.ts"],
                },
            },
        ],
    },
});
