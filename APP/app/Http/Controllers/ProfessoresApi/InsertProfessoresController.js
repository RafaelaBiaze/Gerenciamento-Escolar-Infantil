import ProfessorModel from "../../../Models/ProfessorModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const requestBody = request.body;

    const user = requestBody.user || null;
    const nome = requestBody.nome || null;
    const cpf = requestBody.cpf || null;
    const telefone = requestBody.telefone || null;

    if (nome === null || cpf === null || telefone === null) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Todos os campos são obrigatórios.' });
    }

    

    try {

        const cpfExists = await ProfessorModel.findOne({
            where: {
                cpf_professor: cpf
            }
        });

        if (cpfExists) {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({ error : 'CPF já existe!'});
        }

        const row = await ProfessorModel.create({
            id_user: user,
            nome_professor: nome,
            cpf_professor: cpf,
            telefone_professor: telefone
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};