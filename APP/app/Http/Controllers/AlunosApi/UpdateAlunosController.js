import AlunoModel from "../../../Models/AlunoModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id = request.params.id;

    const requestBody = request.body;

    const turma = requestBody.turma;
    const nome = requestBody.nome;
    const registro = requestBody.registro_aluno;
    const data_nascimento = requestBody.data_nascimento;

    const data = {};

    if (turma !== undefined) {
        data["turma"] = turma;
    }

    if (nome !== undefined) {
        data["nome"] = nome;
    }

    if (registro !== undefined) {
        data["registro"] = registro;
    }

    if (data_nascimento !== undefined) {
        data["data_nascimento"] = data_nascimento;
    }

    // Object.keys({a:1, b:2, c:3}) = [a,b,c]
    // [a,b,c].length = 3

    if (Object.keys(data).length === 0) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: `Nenhum campo foi inputado em ${id}`
        });
    }

    try {

        const [rowsAffected, [row]] = await AlunoModel.update(
            {
                id_turma: turma,
                registro_aluno: registro,
                nome_aluno: nome,
                data_nascimento_aluno: data_nascimento
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
                error: `Nenhum aluno encontrado com ID ${id}`
            });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};