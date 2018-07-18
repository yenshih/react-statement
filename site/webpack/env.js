const {resolve} = require('path');

const env = Object.entries(process.env)
    .filter(([key]) => key.endsWith('_ENV'))
    .reduce((env, [key, value]) => ({...env, [key.match(/^(.*)_ENV$/)[1].toLowerCase()]: value}), {});

const development = env.node === 'development';
const production = env.node === 'production';

const entryDirname = 'src';
const entry = {
    dirname: entryDirname,
    path: resolve(__dirname, '..', entryDirname),
    include: new RegExp(entryDirname),
};

const output = {
    path: resolve(__dirname, '..', '..', 'docs'),
    publicPath: '/react-statement',
};

const dllDirname = 'dll';
const dllPath = resolve(__dirname, '..', dllDirname);
const dllName = 'vendor';
const dll = {
    dirname: dllDirname,
    path: dllPath,
    name: dllName,
    entry: resolve(dllPath, 'index.js'),
    [dllName]: resolve(dllPath, `${dllName}.js`),
    manifest: resolve(dllPath, `${dllName}-manifest.json`),
};

const modernPackages = [];

module.exports = {
    env,
    development,
    production,
    entry,
    output,
    dll,
    modernPackages,
};
