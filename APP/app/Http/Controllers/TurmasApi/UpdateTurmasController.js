import TurmaModel from "../../../Models/TurmaModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id = request.params.id;

    const requestBody = request.body;

    const professor = requestBody.professor;
    const sala = requestBody.sala;
    const periodo = requestBody.periodo;
    const ano = requestBody.ano;

    const data = {};

    if (professor !== undefined) {
        data["professor"] = professor;
    }

    if (sala !== undefined) {
        data["sala"] = sala;
    }

    if (periodo !== undefined) {
        data["periodo"] = periodo;
    }

    if (ano !== undefined) {
        data["ano"] = ano;
    }

    // Object.keys({a:1, b:2, c:3}) = [a,b,c]
    // [a,b,c].length = 3

    if (Object.keys(data).length === 0) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: `Nenhum campo foi inputado em ${id}`
        });
    }

    try {

        const [rowsAffected, [row]] = await TurmaModel.update(
            {
                id_professor: professor,
                sala: sala,
                periodo: periodo,
                ano: ano
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
                error: `Nenhum turma encontrado com ID ${id}`
            });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};