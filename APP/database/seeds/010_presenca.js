import PresencaModel from "../../app/Models/PresencaModel.js";

export default {

    up: async () => {
        const idAluno = 1;

        await PresencaModel.bulkCreate([
            { 
                id_aluno: idAluno,
                data_presenca: '2025-05-09',
                comparecimento: true
            },
        ]);


    },

    down: async () => {
        await PresencaModel.destroy({
            where: {
                data_presenca: [
                    '2025-05-09'
                ]
            }
        });

    }
};