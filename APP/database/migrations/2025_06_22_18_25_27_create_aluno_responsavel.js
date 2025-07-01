import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS aluno_responsavel (
        id_aluno INTEGER NOT NULL,
        id_responsavel INTEGER NOT NULL,

        CONSTRAINT fk_aluno
          FOREIGN KEY (id_aluno)
          REFERENCES alunos(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        
        CONSTRAINT fk_responsavel  
          FOREIGN KEY (id_responsavel)
          REFERENCES responsavel(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,

        CONSTRAINT uq_aluno_responsavel UNIQUE (id_aluno, id_responsavel)
    );
  `);
}

async function down() {
  await db.query(`DROP TABLE aluno_responsavel;`);
}

export default { up, down };