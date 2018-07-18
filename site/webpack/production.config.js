const {resolve} = require('path');

const {
    HashedModuleIdsPlugin,
    optimize: {
        AggressiveMergingPlugin,
    },
} = require('webpack');

const CleanPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const InlineManifestPlugin = require('inline-manifest-webpack-plugin');
const {UnusedFilesWebpackPlugin: UnusedFilesPlugin} = require('unused-files-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const {entry, output} = require('./env');
const {happyPack, shouldTranspilePackages} = require('./utils');

module.exports = {
    entry: {
        app: `./${entry.dirname}/index.tsx`,
    },
    output: {
        ...output,
        filename: '[name].[chunkhash].min.js',
        chunkFilename: '[name].[chunkhash].min.js',
    },
    devtool: 'source-map',
    stats: 'normal',
    profile: true,
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: true,
            automaticNameDelimiter: '.',
        },
        runtimeChunk: 'single',
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [happyPack('babel')],
                include: shouldTranspilePackages,
            },
        ],
    },
    plugins: [
        new CleanPlugin(['docs'], {
            root: resolve(__dirname, '..', '..'),
            verbose: false,
        }),
        new HashedModuleIdsPlugin(),
        new AggressiveMergingPlugin(),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].min.css',
            chunkFilename: '[id].[contenthash].min.css',
        }),
        new HtmlPlugin({
            template: `${entry.dirname}/index.ejs`,
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
        }),
        new HtmlPlugin({
            template: `${entry.dirname}/404.ejs`,
            filename: '404.html',
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
        }),
        new InlineManifestPlugin(),
        new UnusedFilesPlugin({
            patterns: `${entry.dirname}/**/*.*`,
            globOptions: {
                ignore: [
                    '**/*.d.ts',
                    '**/types/*.ts',
                ],
            },
        }),
        new BundleAnalyzerPlugin(),
    ],
};
