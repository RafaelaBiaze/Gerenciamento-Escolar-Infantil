import Table from "cli-table3";
import UserModel from "../Models/UserModel.js"

export default {

    name: 'get-users',
    description: 'Get Users',

    handle: async function (args) {
        const users = await UserModel.findAll();

        const table = new Table({
            head: ['Email', 'Nome', 'Foto'],
            colWidths: [30, 25, 60],
            style: { head: [], border: [] }
        });

        users.forEach(user => {
            const u = user.toJSON();
            table.push([
                u.email || '—',
                u.nome || '—',
                u.foto || '—'
            ]);
        });

        console.log(table.toString());
    }
}