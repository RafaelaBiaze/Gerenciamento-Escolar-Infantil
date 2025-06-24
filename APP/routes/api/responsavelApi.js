import { Router } from 'express';
import ListResponsavelController from '../../app/Http/Controllers/ResponsavelApi/ListResponsavelController.js';
import GetResponsavelController from '../../app/Http/Controllers/ResponsavelApi/GetResponsavelController.js';
import InsertResponsavelController from '../../app/Http/Controllers/ResponsavelApi/InsertResponsavelController.js';
import UpdateResponsavelController from '../../app/Http/Controllers/ResponsavelApi/UpdateResponsavelController.js';
import DeleteResponsavelController from '../../app/Http/Controllers/ResponsavelApi/DeleteResponsavelController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/responsavel', ListResponsavelController);

    // GET Obter
    router.get('/responsavel/:id', GetResponsavelController);

    // POST Inserir
    router.post('/responsavel', InsertResponsavelController);

    // PUT Atualizar
    router.put('/responsavel/:id', UpdateResponsavelController);

    // DELETE Excluir
    router.delete('/responsavel/:id', DeleteResponsavelController);

    return router;

})();