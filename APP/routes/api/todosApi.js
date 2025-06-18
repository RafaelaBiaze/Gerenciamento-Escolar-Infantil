import { Router } from 'express';
import ListTodoController from '../../app/Http/Controllers/TodosApi/ListTodoController.js';
import InsertTodoController from '../../app/Http/Controllers/TodosApi/InsertTodoController.js';
import UpdateTodoController from '../../app/Http/Controllers/TodosApi/UpdateTodoController.js';
import GetTodoController from '../../app/Http/Controllers/TodosApi/GetTodoController.js';
import DeleteTodoController from '../../app/Http/Controllers/TodosApi/DeleteTodoController.js';

export default (function () {

    const router = Router();

    /**
     * @openapi
     * /api/todos:
     *   get:
     *     summary: Lista todos os TODOs
     *     tags:
     *       - Todos
     *     parameters:
     *      - in: query
     *        name: limit
     *        schema:
     *           type: integer
     *           maximum: 100
     *        required: false
     *        description: Limite da paginação
     *      - in: query
     *        name: offset
     *        schema:
     *           type: integer
     *        required: false
     *        description: Offset da paginação
     *     responses:
     *       200:
     *         description: Lista de tarefas
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 rows:
     *                   type: array
     *                   items:
     *                     type: object
     *                 limit:
     *                   type: integer
     *                 next:
     *                   type: integer
     *                   nullable: true
     */
    router.get('/todos', ListTodoController);

    // GET Obter 1
    router.get('/todos/:id', GetTodoController);

    // POST Inserir
    router.post('/todos', InsertTodoController);

    // PUT Atualizar
    router.put('/todos/:id', UpdateTodoController);

    // Delete Excluir
    router.delete('/todos/:id', DeleteTodoController);

    return router;

})();