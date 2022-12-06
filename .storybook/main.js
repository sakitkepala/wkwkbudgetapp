module.exports = {
  stories: [],
  addons: ['@storybook/addon-essentials'],
  core: {
    disableTelemetry: true, // 👈 Disables telemetry: https://storybook.js.org/docs/react/configure/telemetry#how-to-opt-out
  },
  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};
