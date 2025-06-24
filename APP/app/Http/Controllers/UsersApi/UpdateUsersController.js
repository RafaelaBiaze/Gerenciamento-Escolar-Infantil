import UserModel from "../../../Models/UserModel.js";
import bcrypt from 'bcrypt';

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id = request.params.id;

    const requestBody = request.body;

    const login = requestBody.login;
    const email = requestBody.email;
    const senha = requestBody.senha;
    const role = requestBody.role;

    const data = {};

    if (login !== undefined) {
        data["login"] = login;
    }

    if (email !== undefined) {
        data["email"] = email;
    }

    if (senha !== undefined) {
        data["senha"] = senha;
    }

    if (role !== undefined) {
        data["role"] = role;
    }

    // Object.keys({a:1, b:2, c:3}) = [a,b,c]
    // [a,b,c].length = 3

    if (Object.keys(data).length === 0) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: `Nenhum campo foi inputado em ${id}`
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(String(senha), 10);

        const [rowsAffected, [row]] = await UserModel.update(
            {
                login: login,
                email: email,
                senha: hashedPassword,
                id_role: role
            },
            {
                where: {
                    id: id
                },
                returning: true
            }
        );

        if (rowsAffected === 0 || !row) {
            return response.status(HTTP_STATUS.NOT_FOUND).json({
                error: `Nenhum user encontrado com ID ${id}`
            });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};