import { Router } from 'express';
import InsertColaboradorProjetoController from '../../app/Http/Controllers/ColaboradoresProjetosApi/InsertColaboradorProjetoController.js';
import DeleteColaboradorProjetoController from '../../app/Http/Controllers/ColaboradoresProjetosApi/DeleteColaboradorProjetoController.js';

export default (function () {

    const router = Router();

    // POST inserir relacionamento
    router.post('/colaboradores-projetos', InsertColaboradorProjetoController);

    // DELETE excluir relacionamento
    router.delete('/colaboradores-projetos/:id_colaborador/:id_projeto', DeleteColaboradorProjetoController);

    return router;

})();