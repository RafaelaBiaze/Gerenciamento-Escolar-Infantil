import { Router } from 'express';
import ListColaboradorController from '../../app/Http/Controllers/ColaboradoresApi/ListColaboradorController.js';
import InsertColaboradorController from '../../app/Http/Controllers/ColaboradoresApi/InsertColaboradorController.js';
import UpdateColaboradorController from '../../app/Http/Controllers/ColaboradoresApi/UpdateColaboradorController.js';
import GetColaboradorController from '../../app/Http/Controllers/ColaboradoresApi/GetColaboradorController.js';
import DeleteColaboradorController from '../../app/Http/Controllers/ColaboradoresApi/DeleteColaboradorController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/colaboradores', ListColaboradorController);

    // GET Obter
    router.get('/colaboradores/:id', GetColaboradorController);

    // POST Inserir
    router.post('/colaboradores', InsertColaboradorController);

    // PUT Atualizar
    router.put('/colaboradores/:id', UpdateColaboradorController);

    // DELETE Excluir
    router.delete('/colaboradores/:id', DeleteColaboradorController);

    return router;

})();