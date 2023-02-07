const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const path = require("path")

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss",
  ],
  staticDirs: ["public"],
  babel: async (options) => ({
    ...options,
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-proposal-private-property-in-object",
    ],
  }),
  webpackFinal: async (config) => {
    config.resolve = {
      fallback: {
        fs: false,
        path: false,
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
      },
      extensions: [".js", ".ts", ".tsx"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, "../tsconfig.json"),
        }),
      ],
    }
    return config
  },
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
}
