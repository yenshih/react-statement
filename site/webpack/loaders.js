const {loader: extract} = require('mini-css-extract-plugin');

const {development, production, entry} = require('./env');

const sourceMap = {
    loader: 'source-map-loader',
};

const eslint = {
    loader: 'eslint-loader',
    options: {
        cache: development,
        emitWarning: development,
        failedOnError: production,
    },
};

const tslint = {
    loader: 'tslint-loader',
    options: {
        emitErrors: production,
    },
};

const babel = {
    loader: 'babel-loader',
    options: {
        cacheDirectory: development,
    },
};

const typescript = {
    loader: 'awesome-typescript-loader',
    options: {
        silent: true,
        useCache: development,
        forceIsolatedModules: development,
        errorsAsWarnings: development,
        reportFiles: [`${entry.dirname}/**/*.{ts,tsx}`],
    },
};

const style = {
    loader: 'style-loader',
};

const css = {
    loader: 'css-loader',
    options: {
        importLoaders: 2 + production,
        sourceMap: true,
    },
};

const cssModules = {
    loader: 'typings-for-css-modules-loader',
    options: {
        modules: true,
        camelCase: true,
        namedExport: true,
        localIdentName: '[name]-[local]--[hash:base64:5]',
        importLoaders: 2 + production,
        sourceMap: true,
    },
};

const less = {
    loader: 'less-loader',
    options: {
        sourceMap: true,
        javascriptEnabled: true,
    },
};

const postcss = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
    },
};

const url = {
    loader: 'url-loader',
    options: {
        limit: 8192,
        name: development ? '[path][name].[ext]' : '[name].[hash].[ext]',
    },
};

const happyPackLoaders = {
    sourceMap: [sourceMap],
    eslint: [eslint],
    tslint: [tslint],
    babel: [babel],
    ...development
        ? {
            lessModules: [style, cssModules, less],
            less: [style, css, less],
            css: [style, css],
        }
        : {
            lessModules: [cssModules, postcss, less],
            less: [css, postcss, less],
            css: [css, postcss],
        },
};

module.exports = {
    happyPackLoaders,
    typescript,
    extract,
    url,
};
