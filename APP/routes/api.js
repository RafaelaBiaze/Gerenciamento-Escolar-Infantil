import { Router } from 'express';

import colaboradoresApi from './api/colaboradoresApi.js';
import todosApi from './api/todosApi.js';
import colaboradoresProjetosApi from './api/colaboradoresProjetosApi.js';
import projetosApi from './api/projetosApi.js';
import usersApi from './api/usersApi.js';
import professoresApi from './api/professoresApi.js';
import responsavelApi from './api/responsavelApi.js';
import turmasApi from './api/turmasApi.js';
import alunosApi from './api/alunosApi.js';
import atividadesApi from './api/atividadesApi.js';
import presencaApi from './api/presencaApi.js';
import isAdmin from '../app/Http/Middlewares/isAdmin.js';

export default (function () {

    const router = Router();

    // Colaborador api routes
    router.use('/', colaboradoresApi);

    // Todos api routes
    router.use('/', todosApi);

    // Projetos api routes
    router.use('/', projetosApi);

    // Colaborador-Projeto api routes
    router.use('/', colaboradoresProjetosApi);

    //Users
    router.use("/", usersApi);

    //Professores api routes
    router.use("/", isAdmin, professoresApi);

    //Responsavel api routes
    router.use("/", isAdmin, responsavelApi);

    //Turmas api routes
    router.use("/", isAdmin, turmasApi);

    //Alunos api routes
    router.use("/", isAdmin, alunosApi);

    //Atividades api routes
    router.use("/", isAdmin, atividadesApi);

    //Presença api routes
    router.use("/", isAdmin, presencaApi);

    return router;

})();
