import getFilesWithContents from '../getFilesWithContents.js';

export default async function (dir, server) {


    const files = await getFilesWithContents(dir);

    const pathObjects = Object.entries(files).map(([file, data]) => {
        return data;
    });

    const resources = Object.assign({}, ...pathObjects);

    return {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'API - Documentação dinâmica',
                version: '1.0.0'
            },
            servers: [
                {
                    url: server,
                    description: 'Servidor local'
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
            security: [
                {
                    bearerAuth: []
                }
            ],
            paths: resources
        },
        apis: []
    };
};
