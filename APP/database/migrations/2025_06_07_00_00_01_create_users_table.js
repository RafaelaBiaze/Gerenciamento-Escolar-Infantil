import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(155),
        id_role INTEGER,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        foto VARCHAR(255) NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT chave_estrangeira_user_role
            FOREIGN KEY (id_role)
            REFERENCES roles (id)
            ON DELETE SET NULL
            ON UPDATE CASCADE
    );
  `);
}

async function down() {
  await db.query(`DROP TABLE users;`);
}

export default { up, down };