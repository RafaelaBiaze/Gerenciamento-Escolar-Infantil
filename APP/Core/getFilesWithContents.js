// utils/getFiles.js
import path from 'path';
import { readdir } from 'fs/promises';
import { pathToFileURL } from 'url';

export default async function getFiles(dir) {
    const result = [];

    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            const nested = await getFiles(fullPath);
            result.push(...Object.entries(nested));
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            const url = pathToFileURL(fullPath).href;
            const mod = await import(url);
            result.push([entry.name, mod.default]);
        }
    }

    return Object.fromEntries(result.sort((a, b) => a[0].localeCompare(b[0])));
}
