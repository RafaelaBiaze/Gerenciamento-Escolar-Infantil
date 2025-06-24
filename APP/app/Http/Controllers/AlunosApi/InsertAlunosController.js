import AlunoModel from "../../../Models/AlunoModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const requestBody = request.body;

    const turma = requestBody.turma || null;
    const registro = requestBody.registro_aluno || null;
    const nome = requestBody.nome || null;
    const data_nascimento = requestBody.data_nascimento || null;

    if (
        turma === null ||
        registro === null ||
        nome === null ||
        data_nascimento === null
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {

        const row = await AlunoModel.create({
            id_turma: turma,
            registro_aluno: registro,
            nome_aluno: nome,
            data_nascimento_aluno: data_nascimento
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};