import chalk from "chalk";
import CliTable3 from "cli-table3";

export default (commands) => {
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