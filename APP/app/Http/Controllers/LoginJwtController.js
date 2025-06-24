import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../Models/UserModel.js';

//POST /login
export default async (request, response) => {

    const login = request.body.login;
    const email = request.body.email;
    const senha = request.body.senha;

    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = '15m';

    try {
        // Aqui iremos buscar
        const userModel = await UserModel.findOne(
            {
                where: {
                    email: email
                },
                include: [
                    "role"
                ]
            }
        );

        if (!userModel) {
            return response.status(401).json({ error: 'Credenciais inválidas' });
        }

        // 2. Comparar senha
        const senhaValida = await bcrypt.compare(senha, userModel.senha);

        if (!senhaValida) {
            return response.status(401).json({ error: 'Credenciais inválidas' });
        }

        // 3. Gerar JWT
        const payload = {
            id: userModel.id,
            login: userModel.login,
            email: userModel.email,
            role: userModel.role.nome
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return response.json({
            token: token,
            expires_in: JWT_EXPIRES_IN
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return response.status(500).json({ error: 'Erro interno no servidor' });
    }

}