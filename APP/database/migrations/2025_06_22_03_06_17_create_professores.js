import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS professores (
        id SERIAL PRIMARY KEY,
        id_user INTEGER,
        nome_professor VARCHAR(255) NOT NULL,
        cpf_professor VARCHAR(20) NOT NULL UNIQUE,
        telefone_professor VARCHAR(20) NOT NULL,

        CONSTRAINT fk_professor_user
          FOREIGN KEY (id_user) 
          REFERENCES users(id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE,

        UNIQUE (id, id_user)
    );
  `);
}

async function down() {
   await db.query(`DROP TABLE professores;`);
}

export default { up, down };