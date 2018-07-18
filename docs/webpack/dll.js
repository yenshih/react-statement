const {resolve} = require('path');

const {dependencies} = require('../package.json');

const {dll} = require('./env');
const {fs: {access, mkdir, stat, writeFile}} = require('./utils');

const createDll = async () => {
    try {
        await access(dll.path);
    }
    catch {
        await mkdir(dll.path);
    }

    try {
        await access(dll[dll.name]);

        const hasCache = (await stat(dll[dll.name])).mtime > (await stat(resolve(__dirname, '../package.json'))).mtime;

        if (hasCache) {
            process.exit(1);

            return;
        }
    }
    catch {
        const dllEntryContent = Object.keys(dependencies)
            .map(packageName => `import '${packageName}';\n`)
            .join('');

        await writeFile(dll.entry, dllEntryContent);
    }
};

createDll();
