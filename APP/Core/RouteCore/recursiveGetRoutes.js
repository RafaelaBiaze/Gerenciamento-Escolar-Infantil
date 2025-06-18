import getPathFromRegex from "./getPathFromRegex.js";

export default function recursiveGetRoutes(stack, prefix = '') {
    const list = [];

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

            const nestedPrefix = getPathFromRegex(layer.regexp);
            const partial = recursiveGetRoutes(layer.handle.stack, prefix + nestedPrefix);
            partial.forEach((data) => {
                list.push(data);
            });
        }
    });

    return list;
}

