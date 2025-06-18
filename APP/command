import path from 'path';

import createCommandManager from './Core/CommandCore/createCommandManager.js';
import "./bootstrap/app.js";
import initRelations from "./config/sequelize_relations.js";

(async function () {

    initRelations();

    const commandsDir = path.join(CONSTANTS.DIR, 'app', 'Commands');

    const commander = await createCommandManager(commandsDir);

    commander.execute();

})();
