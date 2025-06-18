import sequelize from "../../config/sequelize.js";
import registerCommands from "./registerCommands.js";
import commandCliParams from "./commandCliParams.js";
import listCommands from "./listCommands.js";


export default async function createCommandManager(dir) {

    const commands = await registerCommands(dir);

    const params = commandCliParams();

    const commandName = params.commandName();

    const execute = async () => {
        if (!commandName) {
            listCommands(commands);
            return;
        }

        const command = commands[commandName];

        if (!command) {
            console.error(`Command "${commandName}" not found.`);
            process.exit(1);
        }

        const args = params.arguments();

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
