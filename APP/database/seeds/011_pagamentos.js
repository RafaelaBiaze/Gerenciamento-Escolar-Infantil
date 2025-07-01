import PagamentoModel from "../../app/Models/PagamentoModel.js";

export default {

    up: async () => {
        const idAluno = 1;
        const idResponsavel = 1;

        await PagamentoModel.bulkCreate([
            { 
                id_aluno: idAluno,
                id_responsavel: idResponsavel,
                forma_pagamento: 'PIX',
                valor: 445.00,
                status_pagamento: 'pago',
                data_pagamento: '2025-05-07'
            },
        ]);


    },

    down: async () => {
        await PagamentoModel.destroy({
            where: {
                id_aluno: [ 1 ],
                id_responsavel: [ 1 ]
            }
        });

    }
};