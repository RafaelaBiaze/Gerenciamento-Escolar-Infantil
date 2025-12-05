import ProfessorModel from '../../app/Models/ProfessorModel.js';

export default {

    up: async () => {

        await ProfessorModel.bulkCreate([
            {
                nome_professor: 'Dorivaldo Silva',
                cpf_professor: '12345678901',
                telefone_professor: '11987654321',
                id_user: 2 // User2
            },
            {
                nome_professor: 'Ana Pereira',
                cpf_professor: '22233344455',
                telefone_professor: '11911111111',
                id_user: 4 // User4
            },
            {
                nome_professor: 'Roberto Almeida',
                cpf_professor: '33344455566',
                telefone_professor: '11922222222',
                id_user: 6 // User6
            },
            {
                nome_professor: 'Claudia Fernandes',
                cpf_professor: '44455566677',
                telefone_professor: '11933333333',
                id_user: 7 // User7
            },
            {
                nome_professor: 'Marcelo Costa',
                cpf_professor: '55566677788',
                telefone_professor: '11944444444',
                id_user: 9 // User9
            },
            {
                nome_professor: 'Luana Ribeiro',
                cpf_professor: '66677788899',
                telefone_professor: '11955555555',
                id_user: 11 // User11
            },
            {
                nome_professor: 'Felipe Martins',
                cpf_professor: '77788899900',
                telefone_professor: '11966666666',
                id_user: 12 // User12
            },
            {
                nome_professor: 'Patricia Gomes',
                cpf_professor: '88899900011',
                telefone_professor: '11977777777',
                id_user: 14 // User14
            },
            // -- Professores excedentes (sem usuário vinculado) --
            {
                nome_professor: 'Gustavo Lima',
                cpf_professor: '99900011122',
                telefone_professor: '11988888888',
                id_user: null
            },
            {
                nome_professor: 'Renata Alves',
                cpf_professor: '10111213141',
                telefone_professor: '11999999999',
                id_user: null
            },
            {
                nome_professor: 'Bruno Carvalho',
                cpf_professor: '12131415161',
                telefone_professor: '11910101010',
                id_user: null
            },
            {
                nome_professor: 'Sonia Rocha',
                cpf_professor: '14151617181',
                telefone_professor: '11920202020',
                id_user: null
            }
        ]);
    },

    down: async () => {
        await ProfessorModel.destroy({
            where: {
                cpf_professor: [
                    '12345678901', '22233344455', '33344455566', '44455566677', '55566677788',
                    '66677788899', '77788899900', '88899900011', '99900011122', '10111213141',
                    '12131415161', '14151617181'
                ]
            }
        });
    }
};