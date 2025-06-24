import PresencaModel from "../../../Models/PresencaModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const requestBody = request.body;

    const aluno = requestBody.aluno || null;
    const data_presenca = requestBody.data || null;
    const comparecimento = requestBody.comparecimento || null;

    if (
        aluno === null ||
        data_presenca === null ||
        comparecimento === null
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {

        const row = await PresencaModel.create({
            id_aluno: aluno,
            data_presenca: data_presenca,
            comparecimento: comparecimento
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};