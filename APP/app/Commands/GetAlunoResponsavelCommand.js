import Table from "cli-table3";
import AlunoResponsavelModel from "../Models/AlunoResponsavelModel.js";
import AlunoModel from "../Models/AlunoModel.js";
import ResponsavelModel from "../Models/ResponsavelModel.js";

export default {
    name: 'get-aluno-responsaveis',
    description: 'List all student-guardian relationships',

    handle: async function (args) {
        try {

            const alunoResponsaveis = await AlunoResponsavelModel.findAll({
                include: [
                    {
                        model: AlunoModel,
                        as: 'aluno', 
                        attributes: ['nome_aluno', 'registro_aluno'] 
                    },
                    {
                        model: ResponsavelModel,
                        as: 'responsavel', 
                        attributes: ['nome_responsavel'] 
                    }
                ]
            });

            if (alunoResponsaveis.length === 0) {
                console.log("Nenhuma relação Aluno-Responsável encontrada.");
                return;
            }

            const table = new Table({
                head: ['Registro Aluno', 'Nome do Aluno', 'Nome do Responsável'],
                colWidths: [20, 30, 30], 
                style: { head: [], border: [] }
            });

            alunoResponsaveis.forEach(item => {
                const ar = item.toJSON();
                // Acessa os dados do aluno e do responsável através dos aliases 'aluno' e 'responsavel'
                const nomeAluno = ar.aluno ? ar.aluno.nome_aluno : '—';
                const registroAluno = ar.aluno ? ar.aluno.registro_aluno : '—';
                const nomeResponsavel = ar.responsavel ? ar.responsavel.nome_responsavel : '—';

                table.push([
                    registroAluno,
                    nomeAluno,
                    nomeResponsavel
                ]);
            });

            console.log(table.toString());

        } catch (error) {
            console.error("Erro ao buscar relações Aluno-Responsável:", error.message);
        }
    }
}