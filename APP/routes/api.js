import { Router } from 'express';

import isAdmin from '../app/Http/Middlewares/isAdmin.js';
import isProfessor from '../app/Http/Middlewares/isProfessor.js';
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
import pagamentosApi from './api/pagamentosApi.js';
import alunoResponsavel from './api/alunoResponsavelApi.js';

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
    router.use("/", professoresApi);

    //Responsavel api routes
    router.use("/", responsavelApi);

    //Aluno-Responsavel api routes
    router.use("/", alunoResponsavel);

    //Turmas api routes
    router.use("/", turmasApi);

    //Alunos api routes
    router.use("/", alunosApi);

    //Atividades api routes
    router.use("/", atividadesApi);

    //Presença api routes
    router.use("/", presencaApi);

    //Pagamentos api routes
    router.use("/", pagamentosApi);

    return router;

})();
