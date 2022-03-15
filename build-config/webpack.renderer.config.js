const rules = require('./webpack.rules');
const path = require('path')
const { VueLoaderPlugin } = require("vue-loader")
rules.concat()
rules.push();

module.exports = {
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  module: {
    rules:rules.concat([
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ]),
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
