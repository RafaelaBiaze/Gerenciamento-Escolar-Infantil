import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS alunos (
        id SERIAL PRIMARY KEY,
        id_turma INTEGER,
        registro_aluno VARCHAR(50) NOT NULL UNIQUE,
        nome_aluno VARCHAR(255) NOT NULL,
        data_nascimento_aluno DATE,

        CONSTRAINT fk_aluno_turma
          FOREIGN KEY (id_turma) 
          REFERENCES turmas(id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE,

        UNIQUE (registro_aluno, id_turma)
    );
  `);
}

async function down() {
  await db.query(`DROP TABLE alunos;`);
}

export default { up, down };