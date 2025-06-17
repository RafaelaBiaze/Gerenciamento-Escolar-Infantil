import express from 'express';
import routes from "../routes/routes.js";

export default () => {
    const list = [];

    function extractRoutes(stack, prefix = '') {
        stack.forEach((layer) => {
            if (layer.route) {
                const { path, methods } = layer.route;
                const methodList = Object.keys(methods).map((m) => m.toUpperCase());

                methodList.forEach((method) => {
                    list.push({
                        method,
                        path: prefix + path,
                    });
                });
            } else if (layer.name === 'router' && layer.handle?.stack) {
                // tenta extrair o prefixo
                const nestedPrefix = getPathFromRegex(layer.regexp);
                extractRoutes(layer.handle.stack, prefix + nestedPrefix);
            }
        });
    }

    function getPathFromRegex(regexp) {
        const match = regexp
            .toString()
            .replace('/^', '')
            .replace('\\/?(?=\\/|$)/i', '')
            .replace(/\\\//g, '/')
            .replace(/\\\./g, '.')
            .replace(/\$$/, '')
            .replace(/\//g, '/');

        return match === '^' ? '' : match;
    }

    const app = express();

    app.use("/", routes);

    extractRoutes(app._router.stack);

    return list;
}