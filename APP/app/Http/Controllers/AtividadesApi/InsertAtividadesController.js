import AtividadeModel from "../../../Models/AtividadeModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const requestBody = request.body;

    const turma = requestBody.turma || null;
    const professor = requestBody.professor || null;
    const nome = requestBody.nome || null;
    const descricao = requestBody.descricao || null;
    const data_atividade = requestBody.data || null;

    if (
        turma === null ||
        professor === null ||
        nome === null ||
        data_atividade === null
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {

        const row = await AtividadeModel.create({
            id_turma: turma,
            id_professor: professor,
            nome_atividade: nome,
            descricao_atividade: descricao,
            data_atividade: data_atividade
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};