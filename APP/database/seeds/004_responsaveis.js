import ResponsavelModel from '../../app/Models/ResponsavelModel.js';

export default {

    up: async () => {
        const idUser_responsavel = 3;

        await ResponsavelModel.bulkCreate([
            {
                nome_responsavel: 'Luiz Fernando Pereira',
                cpf_responsavel: '00123456789',
                telefone_responsavel: '11123456789',
                id_user: idUser_responsavel
            }
        ]);
    },

    down: async () => {
        await ResponsavelModel.destroy({
            where: {
                nome_responsavel: 'Luiz Fernando Pereira',
                cpf_responsavel: '00123456789',
                telefone_responsavel: '11123456789'
            }
        });
    }
};