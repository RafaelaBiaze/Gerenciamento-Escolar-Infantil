import Table from "cli-table3";
import UserModel from "../Models/UserModel.js"

export default {

    name: 'get-users',
    description: 'Get Users',

    handle: async function (args) {
        const users = await UserModel.findAll({
            //Inclui a tabela roles para obter o nome.
            include: [
                'role'
            ],
        });

        const table = new Table({
            head: ['Login', 'Email', 'Role Name'],
            colWidths: [25, 30, 30],
            style: { head: [], border: [] }
        });

        users.forEach(user => {
            const u = user.toJSON();
            //Condição para verificar se a role existe, se sim, pega o nome, se não, coloca '—'.
            u.roleName = u.role ? u.role.nome : '—';
            table.push([
                u.login || '—',
                u.email || '—',
                u.roleName
            ]);
        });

        console.log(table.toString());
    }
}