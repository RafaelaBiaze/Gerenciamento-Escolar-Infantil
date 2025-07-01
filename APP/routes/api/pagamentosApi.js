import { Router } from 'express';
import ListPagamentosController from '../../app/Http/Controllers/PagamentosApi/ListPagamentosController.js';
import GetPagamentoController from '../../app/Http/Controllers/PagamentosApi/GetPagamentoController.js';
import InsertPagamentosController from '../../app/Http/Controllers/PagamentosApi/InsertPagamentosController.js';
import UpdatePagamentosController from '../../app/Http/Controllers/PagamentosApi/UpdatePagamentosController.js';
import DeletePagamentosController from '../../app/Http/Controllers/PagamentosApi/DeletePagamentosController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/pagamentos', ListPagamentosController);

    // GET Obter
    router.get('/pagamentos/:id', GetPagamentoController);

    // POST Inserir
    router.post('/pagamentos', InsertPagamentosController);

    // PUT Atualizar
    router.put('/pagamentos/:id', UpdatePagamentosController);

    // DELETE Excluir
    router.delete('/pagamentos/:id', DeletePagamentosController);

    return router;

})();