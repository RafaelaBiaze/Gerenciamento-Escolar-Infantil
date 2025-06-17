import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


export default (function () {

    dotenv.config();

    const env = process.env;

    const conection = new Sequelize(
        env.POSTGRES_DB,
        env.POSTGRES_USER,
        env.POSTGRES_PASSWORD,
        {
            host: env.POSTGRES_HOST,
            port: env.POSTGRES_PORT,
            dialect: 'postgres',
            logging: false
        }
    );

    return conection;

})();