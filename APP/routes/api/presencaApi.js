import { Router } from 'express';
import ListPresencaController from '../../app/Http/Controllers/PresencaApi/ListPresencaController.js';
import GetPresencaController from '../../app/Http/Controllers/PresencaApi/GetPresencaController.js';
import InsertPresencaController from '../../app/Http/Controllers/PresencaApi/InsertPresencaController.js';
import UpdatePresencaController from '../../app/Http/Controllers/PresencaApi/UpdatePresencaController.js';
import DeletePresencaController from '../../app/Http/Controllers/PresencaApi/DeletePresencaController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/presenca', ListPresencaController);

    // GET Obter
    router.get('/presenca/:id', GetPresencaController);

    // POST Inserir
    router.post('/presenca', InsertPresencaController);

    // PUT Atualizar
    router.put('/presenca/:id', UpdatePresencaController);

    // DELETE Excluir
    router.delete('/presenca/:id', DeletePresencaController);

    return router;

})();