
import { Pool } from 'pg';
import dotenv from 'dotenv';

export default (function () {

    dotenv.config();

    const env = process.env;

    const db = new Pool({
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        database: env.POSTGRES_DB,
    });

    return db;

})();