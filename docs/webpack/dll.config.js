const {resolve} = require('path');

const {DllPlugin} = require('webpack');

const {dll} = require('./env');

module.exports = {
    entry: {
        [dll.name]: [dll.entry],
    },
    output: {
        path: dll.path,
        filename: '[name].js',
        library: '[name]',
    },
    mode: 'development',
    stats: 'none',
    plugins: [
        new DllPlugin({
            path: resolve(dll.path, '[name]-manifest.json'),
            name: '[name]',
        }),
    ],
};
