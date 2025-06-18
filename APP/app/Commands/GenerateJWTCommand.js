import jwt from 'jsonwebtoken';
import UserModel from "../Models/UserModel.js";

export default {

    name: 'jwt',

    description: 'Generate User Jwt',

    arguments: {
        email: "string",
        expires: "string"
    },

    async handle({ email, expires }) {

        if (!email) {
            console.error("--email is required");
            return;
        }

        const userModel = await UserModel.findOne({
            where: {
                email: email
            },
            include: [
                "role"
            ]
        });

        const payload = {
            id: userModel.id,
            email: userModel.email,
            nome: userModel.nome,
            role: userModel.role.nome
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expires ?? "15m" });

        console.log(`Usuário: ${userModel.nome}`);
        console.log(`Token: ${token}`);
    }
}