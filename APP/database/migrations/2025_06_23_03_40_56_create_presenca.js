import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS presenca (
        id SERIAL PRIMARY KEY,
        id_aluno INTEGER NOT NULL,
        data_presenca DATE NOT NULL,
        comparecimento BOOLEAN NOT NULL DEFAULT false,

        CONSTRAINT fk_presenca_aluno
          FOREIGN KEY (id_aluno)
          REFERENCES alunos(id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE
    );
  `);

}

async function down() {
  await db.query(`DROP TABLE presenca;`);
}

export default { up, down };