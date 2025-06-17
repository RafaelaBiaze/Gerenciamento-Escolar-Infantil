import { Router } from 'express';

import alunosApi from './api/alunosApi.js';

export default (function () {

    const router = Router();

    // Alunosr api routes
    router.use('/', alunosApi);

    return router;

})();
