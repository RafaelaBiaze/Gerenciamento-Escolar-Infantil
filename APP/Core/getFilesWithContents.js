import path from 'path';
import { readdir } from 'fs/promises';
import { pathToFileURL } from 'url';

export default async (dir) => {
    const files = await readdir(dir);
    const result = [];

    for (const file of files) {
        if (!file.endsWith('.js')) continue;
        const fullFile = path.join(dir, file);
        const urlFile = pathToFileURL(fullFile).href;
        const mod = await import(urlFile);
        const data = mod.default;
        result.push([file, data]);
    }

    result.sort((a, b) => a[0].localeCompare(b[0]));

    return Object.fromEntries(result);
}