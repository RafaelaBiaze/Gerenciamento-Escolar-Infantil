import getFiles from "../getFilesWithContents.js";

/**
 * Iremos varrer o diretório e retornar um objeto com o nome da fila e seu handle
 */
export default async function (dir) {

    const files = await getFiles(dir);

    const jobs = {};

    for (const [filename, job] of Object.entries(files)) {
        if (typeof job !== 'object' || !job.name || typeof job.handle !== 'function') {
            throw new Error(`Job inválido no arquivo ${filename}`);
        }
        jobs[job.name] = job.handle;
    }

    return jobs;

};
