import { promises as fs } from 'fs';
import path from 'path';

export default {
    name: 'create-migration',

    description: 'Create Migration',

    handle: async function ({ name }) {
        if (!name) {
            console.error('✗ Você deve fornecer um nome para a migration.');
            process.exit(1);
        }

        const timestamp = () => {
            const d = new Date();
            const pad = n => String(n).padStart(2, '0');
            return [
                d.getFullYear(),
                pad(d.getMonth() + 1),
                pad(d.getDate()),
                pad(d.getHours()),
                pad(d.getMinutes()),
                pad(d.getSeconds())
            ].join('_');
        };

        const fileName = `${timestamp()}_${name}.js`;
        const migrationsDir = path.join(CONSTANTS.DIR, 'database', 'migrations');
        const destPath = path.join(migrationsDir, fileName);
        const templatePath = path.join(CONSTANTS.DIR, 'Core', 'templates', 'migration_template.txt');

        try {
            await fs.mkdir(migrationsDir, { recursive: true });

            const template = await fs.readFile(templatePath, 'utf8');

            await fs.writeFile(destPath, template, { flag: 'wx' });

            console.log(`✓ Migration criada: database/migrations/${fileName}`);
        } catch (err) {
            if (err.code === 'EEXIST') {
                console.error('✗ Arquivo já existe – escolha outro nome.');
            } else {
                console.error(err);
            }
            process.exit(1);
        }
    }
};