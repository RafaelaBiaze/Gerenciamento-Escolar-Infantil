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
        ])
    },

    down: async () => {
        await UserModel.destroy({
            where: {
                email: ['user1@example.com', 'user2@example.com', 'user3@example.com']
            }
        });

        await RoleModel.destroy({
            where: {
                nome: ['Role_Admin', 'Role_Professor', 'Role_Responsavel']
            }
        });
    }
};
