import { Router } from 'express';
import ListAtividadesController from '../../app/Http/Controllers/AtividadesApi/ListAtividadesController.js';
import GetAtividadeController from '../../app/Http/Controllers/AtividadesApi/GetAtividadeController.js';
import InsertAtividadesController from '../../app/Http/Controllers/AtividadesApi/InsertAtividadesController.js';
import UpdateAtividadesController from '../../app/Http/Controllers/AtividadesApi/UpdateAtividadesController.js';
import DeleteAtividadesController from '../../app/Http/Controllers/AtividadesApi/DeleteAtividadesController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/atividades', ListAtividadesController);

    // GET Obter
    router.get('/atividades/:id', GetAtividadeController);

    // POST Inserir
    router.post('/atividades', InsertAtividadesController);

    // PUT Atualizar
    router.put('/atividades/:id', UpdateAtividadesController);

    // DELETE Excluir
    router.delete('/atividades/:id', DeleteAtividadesController);

    return router;

})();