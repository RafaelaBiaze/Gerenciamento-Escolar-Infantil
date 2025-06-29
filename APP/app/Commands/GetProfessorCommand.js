import Table from "cli-table3";
import ProfessorModel from "../Models/ProfessorModel.js"; 
import UserModel from "../Models/UserModel.js";     
import TurmaModel from "../Models/TurmaModel.js";   

export default {
    name: 'get-professores',
    description: 'Get all professors with associated user and class',

    handle: async function (args) {
        try {
            
            const professors = await ProfessorModel.findAll({
                include: [
                    {
                        model: UserModel, 
                        as: 'user',       
                        attributes: ['login', 'email'] 
                    },
                    {
                        model: TurmaModel, 
                        as: 'turma',      
                        attributes: ['sala', 'periodo', 'ano']
                    }
                ]
            });

            if (professors.length === 0) {
                console.log("Nenhum professor encontrado.");
                return;
            }

            const table = new Table({
                head: ['Nome', 'CPF', 'Telefone', 'Login do Usuário', 'Email do Usuário', 'Turma Responsável'],
                colWidths: [25, 20, 20, 25, 30, 25], 
                style: { head: [], border: [] }
            });

            professors.forEach(professor => {
                const p = professor.toJSON();
                const userLogin = p.user ? p.user.login : '—';
                const userEmail = p.user ? p.user.email : '—';
                
                // AQUI ESTÁ A SEGUNDA MUDANÇA:
                // Construa o nome da turma combinando sala, período e ano
                let nomeTurmaCompleto = '—';
                if (p.turma) {
                    const sala = p.turma.sala || '';
                    const periodo = p.turma.periodo || '';
                    const ano = p.turma.ano || '';
                    nomeTurmaCompleto = `${sala} - ${periodo} (${ano})`;
                    // Você pode ajustar este formato como preferir, ex: `${ano} ${sala} - ${periodo}`
                }

                table.push([
                    p.nome_professor || '—',
                    p.cpf_professor || '—',
                    p.telefone_professor || '—',
                    userLogin,
                    userEmail,
                    nomeTurmaCompleto // Use a nova variável com o nome da turma construído
                ]);
            });

            console.log(table.toString());
        } catch (error) {
            console.error("Erro ao buscar professores:", error.message);
        }
    }
}