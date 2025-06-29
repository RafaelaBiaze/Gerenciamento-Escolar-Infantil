import Table from "cli-table3";
import TurmaModel from "../Models/TurmaModel.js";       
import ProfessorModel from "../Models/ProfessorModel.js"; 
import AlunoModel from "../Models/AlunoModel.js";      
import AtividadeModel from "../Models/AtividadeModel.js"; 
import sequelize from '../../config/sequelize.js';

export default {
    name: 'get-turmas',
    description: 'List all classes with associated professor, student count, and activity count',

    handle: async function (args) {
        try {
            
            const turmas = await TurmaModel.findAll({
                include: [
                    {
                        model: ProfessorModel,
                        as: 'professor', 
                        attributes: ['nome_professor'] 
                    },
                    {
                        model: AlunoModel,
                        as: 'alunos', 
                        attributes: [], 
                        duplicating: false 
                    },
                    {
                        model: AtividadeModel,
                        as: 'atividades', 
                        attributes: [], 
                        duplicating: false 
                    }
                ],
                attributes: {
                    include: [
                        // Inclui a contagem de alunos como 'total_alunos'
                        [sequelize.fn('COUNT', sequelize.col('alunos.id')), 'total_alunos'],
                        // Inclui a contagem de atividades como 'total_atividades'
                        [sequelize.fn('COUNT', sequelize.col('atividades.id')), 'total_atividades']
                    ]
                },
                group: ['TurmaModel.id', 'professor.id'], // Agrupa pelos IDs da turma e do professor

            });

            if (turmas.length === 0) {
                console.log("Nenhuma turma encontrada.");
                return;
            }

            const table = new Table({
                head: ['Sala', 'Período', 'Ano', 'Professor Responsável', 'Alunos', 'Atividades'],
                colWidths: [10, 15, 10, 25, 10, 15],
                style: { head: [], border: [] }
            });

            turmas.forEach(turma => {
                const t = turma.toJSON();
                
                // Obtém o nome do professor, verificando se a associação existe
                const nomeProfessor = t.professor ? t.professor.nome_professor : '—';
                
                // As contagens vêm diretamente no objeto da turma graças ao attributes.include
                const totalAlunos = t.total_alunos || 0;
                const totalAtividades = t.total_atividades || 0;

                table.push([
                    t.sala || '—',
                    t.periodo || '—',
                    t.ano || '—',
                    nomeProfessor,
                    totalAlunos,
                    totalAtividades
                ]);
            });

            console.log(table.toString());

        } catch (error) {
            console.error("Erro ao buscar turmas:", error.message);
        }
    }
}