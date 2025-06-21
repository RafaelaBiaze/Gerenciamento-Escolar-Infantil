import bcrypt from 'bcrypt';
import UserModel from "../Models/UserModel.js";

export default {    
    name: 'criar-usuario',
    description: 'Criar um novo usuário',
    arguments: {
        login: "string",
        email: "string",
        senha: "string",
        role: "integer"
    },

    handle: async function ({ login, email, senha, role = 3 }) {
        if (!login || !email || !senha) {
            console.error("Os argumentos --login, --email e --senha são obrigatórios.");
            return;
        }
        
        const userExists = await UserModel.findOne({
            where: {
                login: login,
                email: email
            }
        });

        if (userExists) {
            return console.error(`Usuário já existe!`);
        }

        try {
            //Criptografando a senha com bcrypt, lembrando de convertê-la para string, pois ele não aceita inteiros.
            const hashedPassword = await bcrypt.hash(String(senha), 10);
            const user = await UserModel.create({
                login: login,
                email: email,
                senha: hashedPassword,
                id_role: role
            });

            console.log(`Usuário criado com sucesso! Login:${user.login} e Email: ${user.email}`);
        } catch (error) {
            console.error("Erro ao criar usuário:", error.message);
        }

    }
}