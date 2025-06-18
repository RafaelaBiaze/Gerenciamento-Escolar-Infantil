import Table from "cli-table3";
import sequelize from "../../config/sequelize.js";

export default {

    name: 'get-tables',

    description: 'Get Tables',

    async handle() {
        const [tables] = await sequelize.query(`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
          ORDER BY table_name;
        `);

        for (const { table_name } of tables) {
            console.log(`\nTabela: ${table_name}`);

            const [columns] = await sequelize.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = '${table_name}'
            ORDER BY ordinal_position;
          `);

            const table = new Table({
                head: ['Coluna', 'Tipo', 'Nulo?'],
                colWidths: [30, 25, 10],
                style: { head: [], border: [] }
            });

            columns.forEach(col => {
                table.push([
                    col.column_name,
                    col.data_type,
                    col.is_nullable
                ]);
            });

            console.log(table.toString());
        }
    }
}