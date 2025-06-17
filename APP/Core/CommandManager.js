// CommandManager.js
import minimist from "minimist";
import { readdir } from 'fs/promises';
import path from "path";
import sequelize from "../config/sequelize.js";
import chalk from "chalk";
import CliTable3 from "cli-table3";
import { pathToFileURL } from 'url';
import getFilesWithContents from "./getFilesWithContents.js";


export default async function createCommandManager(dir) {

    const filesCommand = await getFilesWithContents(dir);

    const result = [];

    for (const file in filesCommand) {
        const commandData = filesCommand[file];
        result.push([commandData.name || "default", commandData]);
    }

    result.sort((a, b) => a[0].localeCompare(b[0]));

    const commands = Object.fromEntries(result);


    const [, , commandName, ...rawArgs] = process.argv;
    const args = minimist(rawArgs);
    delete args["_"];

    const defaultCommand = () => {
        console.log(chalk.bold('\nAvailable commands:\n'));

        const table = new CliTable3({
            head: [chalk.white('Command'), chalk.white('Description'), chalk.white('arguments')],
            colWidths: [30, 60, 40],
            style: {
                head: [],
                border: []
            }
        });

        for (const cmd of Object.values(commands)) {
            table.push([
                chalk.bgGrey(cmd.name),
                chalk.greenBright(cmd.description),
                chalk.yellow(cmd.arguments ? Object.entries(cmd.arguments).map(([key, value]) => `--${key}: ${value}`).join('\n') : '—')
            ]);
        }

        console.log(table.toString());
    };

    const execute = async () => {
        if (!commandName) {
            defaultCommand();
            return;
        }

        const command = commands[commandName];

        if (!command) {
            console.error(`Command "${commandName}" not found.`);
            process.exit(1);
        }

        try {
            await command.handle(args);
        } catch (error) {
            if (error.name === 'SequelizeConnectionRefusedError') {
                console.error('\n❌ Falha ao conectar no banco de dados!');
                console.error(`🔌 Host: ${process.env.POSTGRES_HOST}`);
                console.error(`🔌 Porta: ${process.env.POSTGRES_PORT}`);
                console.error(`🧾 Erro: ${error.message}`);
                process.exit(1);
            }
            console.error('\n[Erro inesperado]');
            console.error(error);
            process.exit(1);
        } finally {
            await sequelize.close();
        }
    };

    return {
        execute: execute,
        commands: commands
    };

}
