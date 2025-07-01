import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS pagamentos (
        id SERIAL PRIMARY KEY,
        id_aluno INTEGER NOT NULL,
        id_responsavel INTEGER NOT NULL,
        forma_pagamento VARCHAR(255) NOT NULL,
        valor DECIMAL(10,2),
        status_pagamento VARCHAR(255) NOT NULL DEFAULT 'pendente',
        data_pagamento DATE,

        CONSTRAINT fk_pagamento_aluno
          FOREIGN KEY (id_aluno)
          REFERENCES alunos(id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE,

        CONSTRAINT fk_pagamento_responsavel
          FOREIGN KEY (id_responsavel)
          REFERENCES responsavel(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
    );
  `);
}

async function down() { 
  await db.query(`DROP TABLE pagamentos;`);
}

export default { up, down };