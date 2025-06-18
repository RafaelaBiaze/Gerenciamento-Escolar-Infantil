import db from '../../config/db.js';

async function up() {
  await db.query(`
    ALTER TABLE colaboradores
    ADD COLUMN cargo VARCHAR(155);
  `);
}

async function down() {
  await db.query(`
    ALTER TABLE colaboradores
    DROP COLUMN cargo;
`);
}

export default { up, down };