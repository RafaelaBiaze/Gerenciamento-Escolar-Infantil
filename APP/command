import path from 'path';
import "./bootstrap/app.js";
import createCommandManager from './Core/CommandManager.js';

import initRelations from "./config/sequelize_relations.js";
import chalk from 'chalk';

(async function () {

    initRelations();

    const commandsDir = path.join(CONSTANTS.DIR, 'app', 'Commands');

    (process.env.IS_CONTAINER)
        ? console.log(chalk.bgBlue("Executando do Container Efêmero"))
        : console.log(chalk.bgBlue("Executando do Host"));

    const commander = await createCommandManager(commandsDir);

    commander.execute();

})();
