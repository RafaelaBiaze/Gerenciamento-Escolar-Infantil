import path from 'path';
import createMigrationManager from '../../Core/MigrationCore/MigrationMaganer.js';

export default {

    name: 'migrate',

    description: 'Run migration (--rollback to undo)',

    arguments: {
        rollback: "boolean"
    },

    async handle({ rollback }) {

        const migrationDir = path.join(CONSTANTS.DIR, 'database', 'migrations');

        const commander = await createMigrationManager(migrationDir);

        if (rollback) {
            await commander.rollback();
            return;
        }

        await commander.execute();
    }
}   