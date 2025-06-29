import Table from "cli-table3";
import AlunoModel from "../Models/AlunoModel.js"; 
import TurmaModel from "../Models/TurmaModel.js"; 

export default {
    name: 'get-alunos',
    description: 'Get all students with their respective classes',

    handle: async function (args) {
        try {
            // Buscando todos os alunos e incluindo os dados da turma associada.
            const alunos = await AlunoModel.findAll({
                include: [
                    {
                        model: TurmaModel,
                        as: 'turma',
                        attributes: ['sala', 'periodo', 'ano']
                    }
                ]
            });

            if (alunos.length === 0) {
                console.log("Nenhum aluno encontrado.");
                return;
            }

            const table = new Table({
                head: ['Registro', 'Nome do Aluno', 'Data de Nascimento', 'Turma'],
                colWidths: [15, 30, 20, 25], 
                style: { head: [], border: [] }
            });

            alunos.forEach(aluno => {
                const a = aluno.toJSON();
                const dataNascimentoFormatada = a.data_nascimento_aluno
                    ? new Date(a.data_nascimento_aluno).toLocaleDateString('pt-BR')
                    : '—';
                
                // AQUI ESTÁ A MUDANÇA:
                // Construa o nome da turma combinando sala, período e ano
                let nomeCompletoTurma = '—';
                if (a.turma) {
                    const sala = a.turma.sala || '';
                    const periodo = a.turma.periodo || '';
                    const ano = a.turma.ano || '';
                    nomeCompletoTurma = `${sala} - ${periodo} (${ano})`;
                    // Você pode ajustar este formato como preferir, ex: `${ano} ${sala} - ${periodo}`
                }

                table.push([
                    a.registro_aluno || '—',
                    a.nome_aluno || '—',
                    dataNascimentoFormatada,
                    nomeCompletoTurma // Use a nova variável com o nome da turma construído
                ]);
            });

            console.log(table.toString());
        } catch (error) {
            console.error("Erro ao buscar alunos:", error.message);
        }
    }
}