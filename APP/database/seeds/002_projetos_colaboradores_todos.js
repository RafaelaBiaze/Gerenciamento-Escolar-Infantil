import ProjetoModel from '../../app/Models/ProjetoModel.js';
import ColaboradorModel from '../../app/Models/ColaboradorModel.js';
import ColaboradorProjetoModel from '../../app/Models/ColaboradorProjetoModel.js';
import TodoModel from '../../app/Models/TodoModel.js';

export default {

    up: async () => {
        const colaboradores = await ColaboradorModel.bulkCreate([
            { nome: 'João da Silva', ativo: true },
            { nome: 'Maria Oliveira', ativo: false },
            { nome: 'Pedro Santos', ativo: true },
            { nome: 'Ana Paula Souza', ativo: true },
            { nome: 'Carlos Eduardo', ativo: false },
            { nome: 'Juliana Rocha', ativo: true }
        ]);

        const projetos = await ProjetoModel.bulkCreate([
            { nome: 'PROJETO 1' },
            { nome: 'PROJETO 2' },
            { nome: 'PROJETO 3' }
        ]);

        await ColaboradorProjetoModel.bulkCreate([
            { id_colaborador: colaboradores[0].id, id_projeto: projetos[0].id },
            { id_colaborador: colaboradores[0].id, id_projeto: projetos[1].id },
            { id_colaborador: colaboradores[1].id, id_projeto: projetos[0].id },
            { id_colaborador: colaboradores[1].id, id_projeto: projetos[1].id },
            { id_colaborador: colaboradores[1].id, id_projeto: projetos[2].id },
            { id_colaborador: colaboradores[2].id, id_projeto: projetos[0].id },
            { id_colaborador: colaboradores[2].id, id_projeto: projetos[2].id },
            { id_colaborador: colaboradores[3].id, id_projeto: projetos[1].id },
            { id_colaborador: colaboradores[4].id, id_projeto: projetos[1].id },
            { id_colaborador: colaboradores[5].id, id_projeto: projetos[1].id },
        ]);


    },

    down: async () => {
        await ColaboradorModel.destroy({
            where: {
                nome: [
                    'João da Silva',
                    'Maria Oliveira',
                    'Pedro Santos',
                    'Ana Paula Souza',
                    'Carlos Eduardo',
                    'Juliana Rocha'
                ]
            }
        });

        await ProjetoModel.destroy({
            where: {
                nome: ['PROJETO 1', 'PROJETO 2', 'PROJETO 3']
            }
        });
    }
};
