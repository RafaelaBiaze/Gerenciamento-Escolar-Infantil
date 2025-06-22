import AlunoModel from "../../app/Models/AlunoModel.js";
import ResponsavelModel from "../../app/Models/ResponsavelModel.js";
import AlunoResponsavelModel from "../../app/Models/AlunoResponsavelModel.js";

export default {

    up: async () => {
        const idUser_responsavel = 3;
        const idTurma = 1;

        const alunos = await AlunoModel.bulkCreate([
            { 
                registro_aluno: '2025001',
                nome_aluno: 'João Henrique do Prado',
                data_nascimento_aluno: '2021-03-19',
                id_turma: idTurma
            },
        ]);

        const responsavel = await ResponsavelModel.bulkCreate([
            { 
                nome_responsavel: 'Luiz Pereira do Prado',
                cpf_responsavel: '00123456789',
                telefone_responsavel: '11123456789',
                id_user: idUser_responsavel
            },
        ]);

        await AlunoResponsavelModel.bulkCreate([
            { id_responsavel: responsavel[0].id,  id_aluno: alunos[0].id },
        ]);


    },

    down: async () => {
        await AlunoModel.destroy({
            where: {
                nome: [
                    'João Henrique do Prado'
                ],
                registro_aluno: [
                    '2025001'
                ]
            }
        });

        await ResponsavelModel.destroy({
            where: {
                nome: [
                    'Luiz Pereira do Prado'
                ],
                cpf_responsavel: [
                    '00123456789'
                ],
            }
        });

    }
};