import { Router } from 'express';
import ListProfessoresController from '../../app/Http/Controllers/ProfessoresApi/ListProfessoresController.js';
import InsertProfessoresController from '../../app/Http/Controllers/ProfessoresApi/InsertProfessoresController.js';
import UpdateProfessoresController from '../../app/Http/Controllers/ProfessoresApi/UpdateProfessoresController.js';
import DeleteProfessoresController from '../../app/Http/Controllers/ProfessoresApi/DeleteProfessoresController.js';
import GetProfessorController from '../../app/Http/Controllers/ProfessoresApi/GetProfessorController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/professores', ListProfessoresController);

    // GET Obter
    router.get('/professores/:id', GetProfessorController);

    // POST Inserir
    router.post('/professores', InsertProfessoresController);

    // PUT Atualizar
    router.put('/professores/:id', UpdateProfessoresController);

    // DELETE Excluir
    router.delete('/professores/:id', DeleteProfessoresController);

    return router;

})();