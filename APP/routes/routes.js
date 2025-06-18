import { Router } from 'express';
import express from 'express';

import api from './api.js';
import web from './web.js';
import JwtAuthMiddleware from '../app/Http/Middlewares/JwtAuthMiddleware.js';
import LoginJwtController from '../app/Http/Controllers/LoginJwtController.js';
import fileUpload from 'express-fileupload';
import LogMiddleware from '../app/Http/Middlewares/LogMiddleware.js';
import CreateJobController from '../app/Http/Controllers/CreateJobController.js';
import HttpDemoradoController from '../app/Http/Controllers/Filas/HttpDemoradoController.js';

export default (function () {

    const router = Router();

    /** Usado para servir json */
    router.use(express.json());

    router.use(express.urlencoded({ extended: true }));

    router.use(fileUpload());

    // Apis
    router.use('/api', JwtAuthMiddleware, LogMiddleware, api);
    router.post('/login', LoginJwtController);
    router.get("/fila", CreateJobController);
    router.get("/slow", HttpDemoradoController);

    ////
    router.use('/', web);

    /** Se nenhuma rota for encontrada, 404 neles! */
    router.use((request, response) => {
        response.status(CONSTANTS.HTTP.NOT_FOUND).json({ error: "Not found" });
    });

    return router;

})();
