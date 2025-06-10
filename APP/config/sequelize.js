import { Sequelize } from 'sequelize';

export default (function () {

    const env = process.env;

    return new Sequelize(
        env.POSTGRES_DB,
        env.POSTGRES_USER,
        env.POSTGRES_PASSWORD,
        {
            host: env.POSTGRES_HOST,
            port: env.POSTGRES_PORT,
            dialect: 'postgres'
        }
    );

})();