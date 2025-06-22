import ProfessorModel from '../../app/Models/ProfessorModel.js';

export default {

    up: async () => {
        const idUser_professor = 2;

        await ProfessorModel.bulkCreate([
            {
                nome_professor: 'Dorivaldo Silva',
                cpf_professor: '12345678901',
                telefone_professor: '11987654321',
                id_user: idUser_professor
            }
        ]);
    },

    down: async () => {
        await ProfessorModel.destroy({
            where: {
                nome_professor: 'Dorivaldo Silva',
                cpf_professor: '12345678901',
                telefone_professor: '11987654321'
            }
        });
    }
};