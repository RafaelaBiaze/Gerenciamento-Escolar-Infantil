import AtividadeModel from "../../app/Models/AtividadeModel.js";

export default {

    up: async () => {
        const idProfessor = 1;
        const idTurma = 1;

        await AtividadeModel.bulkCreate([
            { 
                id_professor: idProfessor,
                id_turma: idTurma, 
                nome_atividade: 'Dias das Mães',
                descricao_atividade: 'Fazer um desenho da mamãe para o dia das mães', 
                data_atividade: '2025-05-09'
            },
        ]);


    },

    down: async () => {
        await AtividadeModel.destroy({
            where: {
                nome_atividade: [
                    'Dias das Mães'
                ],
                data_atividade: [
                    '2025-05-09'
                ]
            }
        });

    }
};