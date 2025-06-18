import db from '../../config/db.js';

async function up() {
  await db.query(`
      CREATE TABLE IF NOT EXISTS colaboradores_projetos (

      id SERIAL PRIMARY KEY,

      id_colaborador INTEGER,
      id_projeto INTEGER,

      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

      -- Chave estrangeira para colaboradores
      CONSTRAINT fk_pivo_colaborador
          FOREIGN KEY (id_colaborador)
          REFERENCES colaboradores (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,

      -- Chave estrangeira para projetos
      CONSTRAINT fk_pivo_projeto
          FOREIGN KEY (id_projeto)
          REFERENCES projetos (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,

      -- Chave única composta: impede duplicidade colaborador-projeto
      CONSTRAINT uq_colaborador_projeto UNIQUE (id_colaborador, id_projeto)
  );
  `);
}

async function down() {
  await db.query(`DROP TABLE colaboradores_projetos;`);
}

export default { up, down };