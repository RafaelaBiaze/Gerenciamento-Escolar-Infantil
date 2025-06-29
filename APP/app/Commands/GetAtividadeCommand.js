import Table from "cli-table3";
import AtividadeModel from "../Models/AtividadeModel.js";
import TurmaModel from "../Models/TurmaModel.js";      
import ProfessorModel from "../Models/ProfessorModel.js"; 

export default {
    name: 'get-atividades',
    description: 'List all activities with their associated class and professor',

    handle: async function (args) {
        try {
            // Buscando todas as atividades, incluindo os dados da turma e do professor associados.
            const atividades = await AtividadeModel.findAll({
                include: [
                    {
                        model: TurmaModel,
                        as: 'turma', 
                        attributes: ['sala', 'periodo', 'ano'] 
                    },
                    {
                        model: ProfessorModel,
                        as: 'professor', 
                        attributes: ['nome_professor'] 
                    }
                ]
            });

            if (atividades.length === 0) {
                console.log("Nenhuma atividade encontrada.");
                return;
            }

            const table = new Table({
                head: ['Nome Atividade', 'Descrição', 'Data', 'Turma', 'Professor'],
                colWidths: [25, 40, 15, 20, 25], 
                style: { head: [], border: [] }
            });

            atividades.forEach(atividade => {
                const a = atividade.toJSON();
                const dataAtividadeFormatada = a.data_atividade
                    ? new Date(a.data_atividade).toLocaleDateString('pt-BR')
                    : '—';
                
                // AQUI ESTÁ A SEGUNDA MUDANÇA:
                // Construa o nome da turma combinando sala, período e ano
                let nomeCompletoTurma = '—';
                if (a.turma) {
                    const sala = a.turma.sala || '';
                    const periodo = a.turma.periodo || '';
                    const ano = a.turma.ano || '';
                    nomeCompletoTurma = `${sala} - ${periodo} (${ano})`;
                    // Você pode ajustar este formato como preferir, ex: `${ano} ${sala} - ${periodo}`
                }
                
                const nomeProfessor = a.professor ? a.professor.nome_professor : '—';

                table.push([
                    a.nome_atividade || '—',
                    a.descricao_atividade || '—',
                    dataAtividadeFormatada,
                    nomeCompletoTurma, // Use a nova variável com o nome da turma construído
                    nomeProfessor
                ]);
            });

            console.log(table.toString());

        } catch (error) {
            console.error("Erro ao buscar atividades:", error.message);
        }
    }
}