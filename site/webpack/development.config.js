const {
    HotModuleReplacementPlugin,
    WatchIgnorePlugin,
    DllReferencePlugin,
} = require('webpack');

const HardSourcePlugin = require('hard-source-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const {entry, output, dll} = require('./env');

const {manifest} = dll;

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        `./${entry.dirname}/index.tsx`,
    ],
    output: {
        filename: '[name].js',
        path: output.path,
        publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hot: true,
        publicPath: '/',
        historyApiFallback: true,
        open: true,
        quiet: true,
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new WatchIgnorePlugin([/\.less\.d\.ts$/]),
        new DllReferencePlugin({manifest}),
        new HardSourcePlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlPlugin({
            template: `${entry.dirname}/index.ejs`,
        }),
        new HtmlIncludeAssetsPlugin({
            assets: [`../${dll.dirname}/${dll.name}.js`],
            files: ['index.html'],
            append: false,
            hash: true,
        }),
    ],
};
