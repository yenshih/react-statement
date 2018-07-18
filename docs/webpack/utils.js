const fs = require('fs');
const {cpus} = require('os');
const {sep} = require('path');
const {promisify} = require('util');

const HappyPack = require('happypack');

const {entry, modernPackages} = require('./env');

const {ThreadPool: createThreadPool} = HappyPack;

const threadPool = createThreadPool({size: cpus().length});

const happyPack = id => `happypack/loader?id=${id}`;

const applyHappyPackPlugins = happyPackLoaders =>
    Object.entries(happyPackLoaders).map(([id, loaders]) => new HappyPack({
        id,
        threadPool,
        loaders,
        verbose: false,
    }));

const shouldEnableCSSModules = path => path.includes(entry.dirname) && !path.includes(`common${sep}styles`);

const shouldTranspilePackages = path =>
    path.includes('node_modules') && modernPackages.some(packageName => path.includes(packageName));

const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);
const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);

module.exports = {
    happyPack,
    applyHappyPackPlugins,
    shouldEnableCSSModules,
    shouldTranspilePackages,
    fs: {
        access,
        mkdir,
        rename,
        stat,
        writeFile,
    },
};
