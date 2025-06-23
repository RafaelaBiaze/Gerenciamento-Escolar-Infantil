import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS atividades (
        id SERIAL PRIMARY KEY,
        id_turma INTEGER NOT NULL,
        id_professor INTEGER NOT NULL,
        nome_atividade VARCHAR(255) NOT NULL,
        descricao_atividade TEXT,
        data_atividade DATE NOT NULL,

        CONSTRAINT fk_atividade_turma
          FOREIGN KEY (id_turma)
          REFERENCES turmas(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,

        CONSTRAINT fk_atividade_professor
          FOREIGN KEY (id_professor)
          REFERENCES professores(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
    );
  `);
}

async function down() {
  await db.query(`DROP TABLE atividades;`);
}

export default { up, down };