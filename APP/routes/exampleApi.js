import { Router } from 'express';
import ListExampleController from '../app/Controllers/ModelExample/ListExampleController.js';
import CreateExampleController from '../app/Controllers/ModelExample/CreateExampleController.js';
import GetExampleController from '../app/Controllers/ModelExample/GetExampleController.js';
import UpdateExampleController from '../app/Controllers/ModelExample/UpdateExampleController.js';
import DeleteExampleController from '../app/Controllers/ModelExample/DeleteExampleController.js';

export default (function () {

    const router = Router();

    // router.metodo("/rota", (request, response) => {...})

    // GET Listar
    router.get('/api/example', ListExampleController);

    // GET Obter um
    router.get('/api/example/:id', GetExampleController);

    // POST Criar
    router.post('/api/example', CreateExampleController);

    // PUT Atualizar
    router.put('/api/example/:id', UpdateExampleController);

    // DELETE Atualizar
    router.delete('/api/example/:id', DeleteExampleController);

    return router;

})();