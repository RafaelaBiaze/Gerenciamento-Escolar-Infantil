import bcrypt from 'bcrypt';

import RoleModel from '../../app/Models/RoleModel.js';
import UserModel from '../../app/Models/UserModel.js';

export default {

    up: async () => {
        const rows = await RoleModel.bulkCreate([
            { nome: 'ROLE_ADMIN' },
            { nome: 'ROLE_USER' }
        ]);

        const senha = "123456";

        await UserModel.bulkCreate([
            { nome: 'User1', email: 'user1@example.com', id_role: rows[0].id, senha: await bcrypt.hash(senha, 10) },
            { nome: 'User2', email: 'user2@example.com', id_role: rows[1].id, senha: await bcrypt.hash(senha, 10) },
        ])
    },

    down: async () => {
        await UserModel.destroy({
            where: {
                email: ['user1@example.com', 'user2@example.com']
            }
        });

        await RoleModel.destroy({
            where: {
                nome: ['ROLE_ADMIN', 'ROLE_USER']
            }
        });
    }
};
