import TurmaModel from "../../../Models/TurmaModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const requestBody = request.body;

    const professor = requestBody.professor || null;
    const sala = requestBody.sala || null;
    const periodo = requestBody.periodo || null;
    const ano = requestBody.ano || null;

    if (
        professor === null ||
        sala === null ||
        periodo === null ||
        ano === null
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {

        const row = await TurmaModel.create({
            id_professor: professor,
            sala: sala,
            periodo: periodo,
            ano: ano
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};