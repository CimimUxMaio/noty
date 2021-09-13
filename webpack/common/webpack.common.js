const path = require("path");

const distDir = path.resolve(process.cwd(), "dist");

module.exports = {
    output: {
        path: distDir,
        filename: "[name].bundle.js"
    },
    devtool: "source-map",
}