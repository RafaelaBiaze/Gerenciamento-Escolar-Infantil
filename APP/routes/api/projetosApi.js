import { Router } from 'express';
import ListProjetoController from '../../app/Http/Controllers/ProjetosApi/ListProjetoController.js';
import GetProjetoController from '../../app/Http/Controllers/ProjetosApi/GetProjetoController.js';
import InsertProjetoController from '../../app/Http/Controllers/ProjetosApi/InsertProjetoController.js';
import UpdateProjetoController from '../../app/Http/Controllers/ProjetosApi/UpdateProjetoController.js';
import DeleteProjetoController from '../../app/Http/Controllers/ProjetosApi/DeleteProjetoController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/projetos', ListProjetoController);

    // GET Obter
    router.get('/projetos/:id', GetProjetoController);

    // POST Inserir
    router.post('/projetos', InsertProjetoController);

    // PUT Atualizar
    router.put('/projetos/:id', UpdateProjetoController);

    // DELETE Excluir
    router.delete('/projetos/:id', DeleteProjetoController);

    return router;

})();