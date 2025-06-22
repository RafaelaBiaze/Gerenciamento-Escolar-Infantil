import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS turmas (
        id SERIAL PRIMARY KEY,
        id_professor INTEGER,
        sala VARCHAR(255) NOT NULL,
        periodo VARCHAR(100) NOT NULL,
        ano VARCHAR(100) NOT NULL,

        CONSTRAINT fk_turma_professor
          FOREIGN KEY (id_professor) 
          REFERENCES professores(id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE,

        UNIQUE (id, id_professor)
    );
  `);
}

async function down() {
  await db.query(`DROP TABLE turmas;`);
}

export default { up, down };