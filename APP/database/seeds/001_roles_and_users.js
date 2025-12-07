import bcrypt from 'bcrypt';

import RoleModel from '../../app/Models/RoleModel.js';
import UserModel from '../../app/Models/UserModel.js';

export default {

    up: async () => {
        const rows = await RoleModel.bulkCreate([
            { nome: 'Role_Admin' }, // 0
            { nome: 'Role_Professor' }, // 1
            { nome: 'Role_Responsavel' } // 2
        ]);

        const senha = "123456";

        await UserModel.bulkCreate([
            { login: 'User1', email: 'user1@example.com', id_role: rows[0].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User2', email: 'user2@example.com', id_role: rows[1].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User3', email: 'user3@example.com', id_role: rows[2].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User4', email: 'user4@example.com', id_role: rows[1].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User5', email: 'user5@example.com', id_role: rows[2].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User6', email: 'user6@example.com', id_role: rows[1].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User7', email: 'user7@example.com', id_role: rows[1].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User8', email: 'user8@example.com', id_role: rows[2].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User9', email: 'user9@example.com', id_role: rows[1].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User10', email: 'user10@example.com', id_role: rows[2].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User11', email: 'user11@example.com', id_role: rows[1].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User12', email: 'user12@example.com', id_role: rows[1].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User13', email: 'user13@example.com', id_role: rows[2].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User14', email: 'user14@example.com', id_role: rows[1].id, senha: await bcrypt.hash(senha, 10) },
            { login: 'User15', email: 'user15@example.com', id_role: rows[2].id, senha: await bcrypt.hash(senha, 10) },
        ])
    },

    down: async () => {
        await UserModel.destroy({
            where: {
                email: [
                    'user1@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com', 'user5@example.com',
                    'user6@example.com', 'user7@example.com', 'user8@example.com', 'user9@example.com', 'user10@example.com',
                    'user11@example.com', 'user12@example.com', 'user13@example.com', 'user14@example.com', 'user15@example.com'
                ]
            }
        });

        await RoleModel.destroy({
            where: {
                nome: ['Role_Admin', 'Role_Professor', 'Role_Responsavel']
            }
        });
    }
};
