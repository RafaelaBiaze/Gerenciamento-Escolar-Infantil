import Table from 'cli-table3';
import routes from '../../routes/routes.js';
import recursiveGetRoutes from '../../Core/RouteCore/recursiveGetRoutes.js';
import express from 'express';

export default {
    name: 'listar-rotas',
    description: 'Lista todas as rotas do Express com middlewares',

    async handle() {
        console.log('\n🔍 Obtendo rotas do Express com middlewares...\n');

        const table = new Table({
            head: ['Método', 'Path'],
            colWidths: [10, 60]
        });

        const app = express();

        app.use("/", routes);

        const routeList = recursiveGetRoutes(app._router.stack);

        if (routeList.length === 0) {
            console.log('⚠️ Nenhuma rota registrada.');
        } else {
            routeList.forEach((route) =>
                table.push([route.method, route.path])
            );
            console.log(table.toString());
        }
    }
};
