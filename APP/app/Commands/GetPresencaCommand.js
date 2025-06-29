import Table from "cli-table3";
import PresencaModel from "../Models/PresencaModel.js"; 
import AlunoModel from "../Models/AlunoModel.js";       

export default {
    name: 'get-presencas',
    description: 'List all attendance records with associated student names',

    handle: async function (args) {
        try {
            
            const presencas = await PresencaModel.findAll({
                include: [
                    {
                        model: AlunoModel,
                        as: 'aluno', 
                        attributes: ['nome_aluno', 'registro_aluno'] 
                    }
                ],
                order: [
                    ['data_presenca', 'DESC'] // Ordena pela data da presença, mais recente primeiro
                ]
            });

            if (presencas.length === 0) {
                console.log("Nenhum registro de presença encontrado.");
                return;
            }

            const table = new Table({
                head: ['Data', 'Comparecimento', 'Registro Aluno', 'Nome do Aluno'],
                colWidths: [15, 18, 18, 30],
                style: { head: [], border: [] }
            });

            presencas.forEach(presenca => {
                const p = presenca.toJSON();
                
                const dataPresencaFormatada = p.data_presenca
                    ? new Date(p.data_presenca).toLocaleDateString('pt-BR')
                    : '—';
                
                // Converte o booleano de comparecimento para uma string mais legível
                const comparecimentoStatus = p.comparecimento ? 'Presente' : 'Faltou';

                // Obtém o nome e registro do aluno, verificando se a associação existe
                const nomeAluno = p.aluno ? p.aluno.nome_aluno : '—';
                const registroAluno = p.aluno ? p.aluno.registro_aluno : '—';

                table.push([
                    dataPresencaFormatada,
                    comparecimentoStatus,
                    registroAluno,
                    nomeAluno
                ]);
            });

            console.log(table.toString());

        } catch (error) {
            console.error("Erro ao buscar registros de presença:", error.message);
        }
    }
}