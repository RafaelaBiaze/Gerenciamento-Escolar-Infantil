import db from '../../config/db.js';
import { Sequelize } from 'sequelize';
import getFilesWithContents from '../getFilesWithContents.js';
import getLastStep from './getLastStep.js';
import getExecutedSeeds from './getExecutedSeeds.js';

export default async function createSeedManager(dir) {

    const files = await getFilesWithContents(dir);

    const executedSeeds = await getExecutedSeeds();

    const lastStep = await getLastStep();

    const nextStep = lastStep + 1;

    const execute = async () => {

        let executedCount = 0;

        for (const file in files) {
            if (file in executedSeeds) {
                continue;
            }

            const seed = files[file]

            console.log(`Running ${file}...`);

            try {
                await seed.up();
            } catch (error) {
                if (error instanceof Sequelize.DatabaseError) {
                    console.error(`\n❌ Erro ao executar seed ${file}`);
                    console.error('💡 As tabelas ou os campos da seed não foram criadas.');
                    console.error('➡ Execute as migrations antes de rodar os seeds.');
                    console.error(`Detalhes técnicos: ${error.message}`);
                    process.exit(1);
                } else {
                    throw error;
                }
            }
            await db.query('INSERT INTO seeds (name, step) VALUES ($1, $2)', [file, nextStep]);

            executedCount++;
        }

        (executedCount > 0) ? (console.log('Seeds complete.')) : (console.log('No Seeds to run.'));

        await db.end();
    }

    const rollback = async () => {

        if (lastStep === 0) {
            console.log('No seeds to rollback.');
            await db.end();
            return;
        }

        for (const seed in executedSeeds) {
            const seedStep = executedSeeds[seed];

            if (seedStep !== lastStep) {
                continue;
            }

            console.log(`Rollback ${seed}...`);

            const content = files[seed];
            await content.down();
            await db.query('DELETE FROM seeds WHERE NAME = $1', [seed]);
        }



        console.log(`Rollback step ${lastStep} complete.`);
        await db.end();

    };

    return {
        execute: execute,
        rollback: rollback
    };

}
