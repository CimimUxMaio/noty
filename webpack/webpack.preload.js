const { merge } = require("webpack-merge");
const jsConfig = require("./common/webpack.javascript");
const common = require("./common/webpack.common");

module.exports = merge(common, jsConfig, {
    entry: { preload: "./src/preload.js" },
    target: "electron-preload",
});