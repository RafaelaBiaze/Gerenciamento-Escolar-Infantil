import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS alunos_materias (
        id SERIAL PRIMARY KEY,
        id_aluno INTEGER,
        id_materia INTEGER,

        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        -- Chave estrangeira para colaboradores
        CONSTRAINT fk_pivo_aluno
            FOREIGN KEY (id_aluno)
            REFERENCES alunos (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,

      -- Chave estrangeira para projetos
      CONSTRAINT fk_pivo_materia
          FOREIGN KEY (id_materia)
          REFERENCES materias (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,

      CONSTRAINT uq_aluno_materia UNIQUE (id_aluno, id_materia)
    );
  `);
}

async function down() {
  await db.query(`DROP TABLE alunos_materias;`);
}

export default { up, down };