import { Router } from 'express';
import ListTurmasController from '../../app/Http/Controllers/TurmasApi/ListTurmasController.js';
import GetTurmaController from '../../app/Http/Controllers/TurmasApi/GetTurmaController.js';
import InsertTurmasController from '../../app/Http/Controllers/TurmasApi/InsertTurmasController.js';
import UpdateTurmasController from '../../app/Http/Controllers/TurmasApi/UpdateTurmasController.js';
import DeleteTurmasController from '../../app/Http/Controllers/TurmasApi/DeleteTurmasController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/turmas', ListTurmasController);

    // GET Obter
    router.get('/turmas/:id', GetTurmaController);

    // POST Inserir
    router.post('/turmas', InsertTurmasController);

    // PUT Atualizar
    router.put('/turmas/:id', UpdateTurmasController);

    // DELETE Excluir
    router.delete('/turmas/:id', DeleteTurmasController);

    return router;

})();