import db from '../../config/db.js';

async function up() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        login VARCHAR(155) UNIQUE NOT NULL,
        id_role INTEGER,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_user_role
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