import AtividadeModel from "../../../Models/AtividadeModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id = request.params.id;

    const requestBody = request.body;

    const turma = requestBody.turma;
    const professor = requestBody.professor;
    const nome = requestBody.nome;
    const descricao = requestBody.descricao;
    const data_atividade = requestBody.data;

    const data = {};

    if (turma !== undefined) {
        data["turma"] = turma;
    }

    if (professor !== undefined) {
        data["professor"] = professor;
    }

    if (nome !== undefined) {
        data["nome"] = nome;
    }

    if (descricao !== undefined) {
        data["descricao"] = descricao;
    }

    if (data_atividade !== undefined) {
        data["data_atividade"] = data_atividade;
    }

    // Object.keys({a:1, b:2, c:3}) = [a,b,c]
    // [a,b,c].length = 3

    if (Object.keys(data).length === 0) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: `Nenhum campo foi inputado em ${id}`
        });
    }

    try {

        const [rowsAffected, [row]] = await AtividadeModel.update(
            {
                id_turma: turma,
                id_professor: professor,
                nome_atividade: nome,
                descricao_atividade: descricao,
                data_atividade: data_atividade
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
                error: `Nenhum atividade encontrado com ID ${id}`
            });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};