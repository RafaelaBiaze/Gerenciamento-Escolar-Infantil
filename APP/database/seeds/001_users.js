import bcrypt from 'bcrypt';
import UserModel from '../../app/Models/UserModel.js';

export default {

    up: async () => {

        const senha = "123456";

        await UserModel.bulkCreate([
            { nome: 'User1', email: 'user1@example.com', senha: await bcrypt.hash(senha, 10) },
        ])
    },

    down: async () => {
        await UserModel.destroy({
            where: {
                email: ['user1@example.com', 'user2@example.com']
            }
        });
    }
};
