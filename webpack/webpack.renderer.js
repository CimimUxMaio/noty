const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./common/webpack.common");


module.exports = merge(common, {
    entry: { renderer: "./src/renderer/renderer.js" },
    target: "electron-renderer",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-react",
                            {
                                runtime: "automatic"
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "public/indexTemplate.html" }),
    ],
});