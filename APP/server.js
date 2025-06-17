import express from 'express';
import chalk from 'chalk';

import "./bootstrap/app.js"
import routes from "./routes/routes.js";
import initRelations from "./config/sequelize_relations.js";

/** Iniciar roteador */
const app = express();

/** Inicializar rotas  */
app.use("/", routes);

initRelations();

/** Escolher as portas baseado se foi inicializado com ou sem nginx */
const webPort = process.env.PORT || 3000;

const nodePort = process.env.NODE_PORT || webPort;

app.listen(nodePort, () => {
    console.log(chalk.green(`Servidor: http://localhost:${webPort}`));
    console.log(chalk.yellow(`Apis Swagger: http://localhost:${webPort}/docs`));
});