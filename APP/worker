import path from "path";

import createWorker from "./Core/QueueCore/createWorker.js";
import "./bootstrap/app.js";
import initRelations from "./config/sequelize_relations.js";
import resolveParams from "./Core/QueueCore/resolveParams.js";

(async function () {

    initRelations();

    const dir = path.join(CONSTANTS.DIR, 'app', 'Jobs');

    const worker = await createWorker(dir);

    const { queue, concurrency } = resolveParams();

    await worker.listen(queue, concurrency);

})();
