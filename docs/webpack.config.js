const merge = require('webpack-merge');

const {env} = require('./webpack/env');
const baseConfig = require('./webpack/base.config');
const envConfig = require(`./webpack/${env.node}.config`);

module.exports = merge(baseConfig, envConfig);
