// Konfig Vanilla Extract contoh dari:
// https://vanilla-extract.style/documentation/integrations/webpack/

const { merge } = require('webpack-merge');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Config webpack custom dari docs Nx:
// https://nx.dev/recipes/other/customize-webpack
// TODO: konfig MiniCssExtractPlugin ini error di prod, perbaiki nanti
module.exports = (config) => {
  return merge(config, {
    plugins: [new VanillaExtractPlugin(), new MiniCssExtractPlugin()],
  });
};
