import { Router } from 'express';
import ListAlunoController from '../../app/Http/Controllers/AlunosApi/ListAlunoController.js';

export default (function () {

    const router = Router();

    router.get('/alunos', ListAlunoController);

    return router;

})();