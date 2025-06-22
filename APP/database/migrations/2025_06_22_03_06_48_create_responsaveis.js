import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS responsavel (
        id SERIAL PRIMARY KEY,
        id_user INTEGER,
        nome_responsavel VARCHAR(255) NOT NULL,
        cpf_responsavel VARCHAR(20) NOT NULL UNIQUE,
        telefone_responsavel VARCHAR(20) NOT NULL,

        CONSTRAINT fk_responsavel_user
          FOREIGN KEY (id_user) 
          REFERENCES users(id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE,

        UNIQUE (id, id_user)
    );
  `);
}

async function down() {
  await db.query(`DROP TABLE responsavel;`);
}

export default { up, down };