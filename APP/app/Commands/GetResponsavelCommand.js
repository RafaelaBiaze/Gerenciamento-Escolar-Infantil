import Table from "cli-table3";
import ResponsavelModel from "../Models/ResponsavelModel.js"; 
import UserModel from "../Models/UserModel.js";

export default {
    name: 'get-responsaveis',
    description: 'List all guardians with associated user information',

    handle: async function (args) {
        try {
            
            const responsaveis = await ResponsavelModel.findAll({
                include: [
                    {
                        model: UserModel,
                        as: 'user', 
                        attributes: ['login', 'email'] 
                    }
                ]
            });

            if (responsaveis.length === 0) {
                console.log("Nenhum responsável encontrado.");
                return;
            }

            const table = new Table({
                head: ['Nome Responsável', 'CPF', 'Telefone', 'Login do Usuário', 'Email do Usuário'],
                colWidths: [30, 20, 20, 25, 30], 
                style: { head: [], border: [] }
            });

            responsaveis.forEach(responsavel => {
                const r = responsavel.toJSON();
                // Obtém o login e email do usuário, verificando se a associação existe
                const userLogin = r.user ? r.user.login : '—';
                const userEmail = r.user ? r.user.email : '—';

                table.push([
                    r.nome_responsavel || '—',
                    r.cpf_responsavel || '—',
                    r.telefone_responsavel || '—',
                    userLogin,
                    userEmail
                ]);
            });

            console.log(table.toString());

        } catch (error) {
            console.error("Erro ao buscar responsáveis:", error.message);
        }
    }
}