import { Router } from 'express';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import swagger from '../config/swagger.js';

export default (function () {

    const router = Router();

    /** Servir o public estaticamente, tanto para arquivos como para os assets de frontend */
    // NÃO SERÁ CHAMADO CASO TENHA A CAMADA DE NGINX COM ARQUIVOS ESTÁTICOS
    router.use(express.static(path.join(CONSTANTS.DIR, 'public')));

    // Documentação Swagger
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

    return router;

})();
