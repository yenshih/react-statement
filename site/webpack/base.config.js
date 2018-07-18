const {
    EnvironmentPlugin,
    ContextReplacementPlugin,
} = require('webpack');

const StylelintPlugin = require('stylelint-webpack-plugin');

const {
    env,
    production,
    entry,
} = require('./env');
const {
    happyPackLoaders,
    typescript,
    extract,
    url,
} = require('./loaders');
const {
    happyPack,
    applyHappyPackPlugins,
    shouldEnableCSSModules,
} = require('./utils');

module.exports = {
    mode: env.node,
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: [happyPack('sourceMap')],
                include: entry.include,
            }, {
                enforce: 'pre',
                test: /\.(j|t)sx?$/,
                use: [happyPack('eslint')],
                include: entry.include,
            }, {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: [happyPack('tslint')],
                include: entry.include,
            }, {
                test: /\.tsx?$/,
                use: [happyPack('babel'), typescript],
                include: entry.include,
            }, {
                test: /\.less$/,
                use: [...production ? [extract] : [], happyPack('lessModules')],
                include: shouldEnableCSSModules,
            }, {
                test: /\.less$/,
                use: [...production ? [extract] : [], happyPack('less')],
                exclude: shouldEnableCSSModules,
            }, {
                test: /\.css$/,
                use: [...production ? [extract] : [], happyPack('css')],
            }, {
                test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)(\?.*)?$/,
                use: [url],
            },
        ],
    },
    plugins: [
        ...applyHappyPackPlugins(happyPackLoaders),
        new EnvironmentPlugin(process.env),
        new ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/),
        new StylelintPlugin({
            files: `${entry.dirname}/**/*.less`,
            emitErrors: production,
            failOnError: production,
        }),
    ],
};
