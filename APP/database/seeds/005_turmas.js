import TurmaModel from '../../app/Models/TurmaModel.js';

export default {

    up: async () => {
        const idProfessor = 1;

        await TurmaModel.bulkCreate([
            {
                sala: 'Sala A1',
                periodo: 'Manhã',
                ano: '2025',
                id_professor: idProfessor
            }
        ]);
    },

    down: async () => {
        await TurmaModel.destroy({
            where: {
                sala: 'Sala A1',
                periodo: 'Manhã',
                ano: '2025'
            }
        });
    }
};