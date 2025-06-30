import { Router } from 'express';
import ListAtividadesController from '../../app/Http/Controllers/AtividadesApi/ListAtividadesController.js';
import GetAtividadeController from '../../app/Http/Controllers/AtividadesApi/GetAtividadeController.js';
import InsertAtividadesController from '../../app/Http/Controllers/AtividadesApi/InsertAtividadesController.js';
import UpdateAtividadesController from '../../app/Http/Controllers/AtividadesApi/UpdateAtividadesController.js';
import DeleteAtividadesController from '../../app/Http/Controllers/AtividadesApi/DeleteAtividadesController.js';
import isProfessor from '../../app/Http/Middlewares/isProfessor.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/atividades', isProfessor, ListAtividadesController);

    // GET Obter
    router.get('/atividades/:id', isProfessor, GetAtividadeController);

    // POST Inserir
    router.post('/atividades', isProfessor, InsertAtividadesController);

    // PUT Atualizar
    router.put('/atividades/:id', isProfessor, UpdateAtividadesController);

    // DELETE Excluir
    router.delete('/atividades/:id', isProfessor, DeleteAtividadesController);

    return router;

})();