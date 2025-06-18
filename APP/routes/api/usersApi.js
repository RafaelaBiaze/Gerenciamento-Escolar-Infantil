import { Router } from 'express';
import UploadImageController from '../../app/Http/Controllers/UsersApi/UploadImageController.js';
import VerifyImage from '../../app/Http/Middlewares/VerifyImage.js';

export default (function () {

    const router = Router();

    router.post('/users/image', VerifyImage, UploadImageController);

    return router;

})();