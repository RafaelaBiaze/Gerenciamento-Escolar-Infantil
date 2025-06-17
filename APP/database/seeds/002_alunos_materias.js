import AlunoModel from '../../app/Models/AlunoModel.js';
import MateriaModel from '../../app/Models/MateriaModel.js';
import AlunoMateriaModel from '../../app/Models/AlunoMateriaModel.js';

export default {

    up: async () => {
        // Criar 60 alunos
        const alunos = await AlunoModel.bulkCreate(
            Array.from({ length: 60 }, (_, i) => ({
                nome: `Aluno ${i + 1}`
            }))
        );

        // Criar 5 matérias
        const materias = await MateriaModel.bulkCreate([
            { nome: 'Matemática' },
            { nome: 'Português' },
            { nome: 'História' },
            { nome: 'Geografia' },
            { nome: 'Ciências' }
        ]);

        // Criar 300 matrículas (60 alunos x 5 matérias)
        const matriculas = [];
        for (const aluno of alunos) {
            for (const materia of materias) {
                matriculas.push({
                    id_aluno: aluno.id,
                    id_materia: materia.id
                });
            }
        }

        await AlunoMateriaModel.bulkCreate(matriculas);
    },

    down: async () => {
        await AlunoModel.destroy({
            where: {
                nome: Array.from({ length: 60 }, (_, i) => `Aluno ${i + 1}`)
            }
        });

        await MateriaModel.destroy({
            where: {
                nome: ['Matemática', 'Português', 'História', 'Geografia', 'Ciências']
            }
        });
    }
};
