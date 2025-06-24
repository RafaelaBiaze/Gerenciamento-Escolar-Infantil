import PresencaModel from "../../../Models/PresencaModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id = request.params.id;

    const requestBody = request.body;

    const aluno = requestBody.aluno;
    const data_presenca = requestBody.data;
    const comparecimento = requestBody.comparecimento;

    const data = {};

    if (aluno !== undefined) {
        data["aluno"] = aluno;
    }

    if (data_presenca !== undefined) {
        data["data_presenca"] = data_presenca;
    }

    if (comparecimento !== undefined) {
        data["comparecimento"] = comparecimento;
    }

    // Object.keys({a:1, b:2, c:3}) = [a,b,c]
    // [a,b,c].length = 3

    if (Object.keys(data).length === 0) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: `Nenhum campo foi inputado em ${id}`
        });
    }

    try {

        const [rowsAffected, [row]] = await PresencaModel.update(
            {
                id_aluno: aluno,
                data_presenca: data_presenca,
                comparecimento: comparecimento
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
                error: `Nenhum presença encontrado com ID ${id}`
            });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};