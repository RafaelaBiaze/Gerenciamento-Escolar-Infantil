import { Router } from 'express';
import InsertAlunoResponsavelController from '../../app/Http/Controllers/AlunoResponsavelApi/InsertAlunoResponsavelController.js';
import DeleteAlunoResponsavelController from '../../app/Http/Controllers/AlunoResponsavelApi/DeleteAlunoResponsavelController.js';

export default (function () {

    const router = Router();

    // POST inserir relacionamento
    router.post('/aluno-responsavel', InsertAlunoResponsavelController);

    // DELETE excluir relacionamento
    router.delete('/aluno-responsavel/:id_aluno/:id_responsavel', DeleteAlunoResponsavelController);

    return router;

})();