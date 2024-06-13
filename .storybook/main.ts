import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      // '@storybook/addon-interactions',
      '@storybook/addon-styling',
      '@storybook/addon-designs',
      '@storybook/addon-themes',
      '@storybook/addon-webpack5-compiler-babel'
    ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
        autodocs: "tag",
    },
    staticDirs: [
        // { from: '../src/assets/fonts', to: '/fonts' }
    ],
};
export default config;
