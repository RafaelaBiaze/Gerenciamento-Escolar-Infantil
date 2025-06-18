import path from 'path';
import createSeedManager from '../../Core/SeedCore/SeedMaganer.js';

export default {

    name: 'seed',

    description: 'Make Seeds (--rollback to undo)',

    arguments: {
        rollback: "boolean"
    },

    async handle({ rollback }) {

        const seedDir = path.join(CONSTANTS.DIR, 'database', 'seeds');

        const commander = await createSeedManager(seedDir);

        if (rollback) {
            await commander.rollback();
            return;
        }

        await commander.execute();
    }
}   