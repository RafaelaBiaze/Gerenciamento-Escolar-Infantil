import db from '../../config/db.js';
import getFilesWithContents from '../getFilesWithContents.js';
import getExecutedMigrations from './getExecutedMigrations.js';
import getLastStep from './getLastStep.js';

export default async function createMigrationManager(dir) {

    const files = await getFilesWithContents(dir);

    const executedMigrations = await getExecutedMigrations();

    const lastStep = await getLastStep();

    const nextStep = lastStep + 1;

    const execute = async () => {

        let executedCount = 0;

        for (const file in files) {
            if (file in executedMigrations) {
                continue;
            }

            const migration = files[file];

            console.log(`Running ${file}...`);
            await migration.up();
            await db.query('INSERT INTO migrations (name, step) VALUES ($1, $2)', [file, nextStep]);

            executedCount++;
        }

        (executedCount > 0) ? (console.log('Migrations complete.')) : (console.log('No migrations to run.'));

        await db.end();
    }

    const rollback = async () => {

        if (lastStep === 0) {
            console.log('No migrations to rollback.');
            await db.end();
            return;
        }

        for (const migration in executedMigrations) {
            const migrationStep = executedMigrations[migration];

            if (migrationStep !== lastStep) {
                continue;
            }

            console.log(`Rollback ${migration}...`);

            const content = files[migration];

            await content.down();
            await db.query('DELETE FROM migrations WHERE NAME = $1', [migration]);
        }



        console.log(`Rollback step ${lastStep} complete.`);

        await db.end();
    };

    return {
        execute: execute,
        rollback: rollback
    };

}
