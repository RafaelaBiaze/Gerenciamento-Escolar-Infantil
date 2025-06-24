import { Router } from 'express';
import ListAlunosController from '../../app/Http/Controllers/AlunosApi/ListAlunosController.js';
import GetAlunoController from '../../app/Http/Controllers/AlunosApi/GetAlunoController.js';
import InsertAlunosController from '../../app/Http/Controllers/AlunosApi/InsertAlunosController.js';
import UpdateAlunosController from '../../app/Http/Controllers/AlunosApi/UpdateAlunosController.js';
import DeleteAlunosController from '../../app/Http/Controllers/AlunosApi/DeleteAlunosController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/alunos', ListAlunosController);

    // GET Obter
    router.get('/alunos/:id', GetAlunoController);

    // POST Inserir
    router.post('/alunos', InsertAlunosController);

    // PUT Atualizar
    router.put('/alunos/:id', UpdateAlunosController);

    // DELETE Excluir
    router.delete('/alunos/:id', DeleteAlunosController);

    return router;

})();