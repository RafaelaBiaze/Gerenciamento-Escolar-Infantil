import { Router } from 'express';
import UploadImageController from '../../app/Http/Controllers/UsersApi/UploadImageController.js';
import VerifyImage from '../../app/Http/Middlewares/VerifyImage.js';
import ListUsersController from '../../app/Http/Controllers/UsersApi/ListUsersController.js';
import GetUserController from '../../app/Http/Controllers/UsersApi/GetUserController.js';
import InsertUsersController from '../../app/Http/Controllers/UsersApi/InsertUsersController.js';
import UpdateUsersController from '../../app/Http/Controllers/UsersApi/UpdateUsersController.js';
import DeleteUsersController from '../../app/Http/Controllers/UsersApi/DeleteUsersController.js';

export default (function () {

    const router = Router();

    router.post('/users/image', VerifyImage, UploadImageController);

    // GET Listar
    router.get('/users', ListUsersController);
    
    // GET Obter
    router.get('/users/:id', GetUserController);
    
    // POST Inserir
    router.post('/users', InsertUsersController);
    
    // PUT Atualizar
    router.put('/users/:id', UpdateUsersController);
    
    // DELETE Excluir
    router.delete('/users/:id', DeleteUsersController);

    return router;

})();