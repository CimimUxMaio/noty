const rendererConfig = require("./webpack/webpack.renderer");
const mainConfig = require("./webpack/webpack.main");
const preloadConfig = require("./webpack/webpack.preload");

module.exports = [
    rendererConfig,
    mainConfig,
    preloadConfig
]