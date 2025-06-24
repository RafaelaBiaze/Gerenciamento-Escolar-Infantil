import UserModel from "../../../Models/UserModel.js";
import bcrypt from 'bcrypt';

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const requestBody = request.body;

    const login = requestBody.login || null;
    const email = requestBody.email || null;
    const senha = requestBody.senha || null;
    const role = requestBody.role || null;

    if (
        login === null ||
        email === null ||
        senha === null ||
        role === null
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Todos os campos são obrigatórios.' });
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
        const hashedPassword = await bcrypt.hash(String(senha), 10);
        
        const row = await UserModel.create({
            login: login,
            email: email,
            senha: hashedPassword,
            id_role: role
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};