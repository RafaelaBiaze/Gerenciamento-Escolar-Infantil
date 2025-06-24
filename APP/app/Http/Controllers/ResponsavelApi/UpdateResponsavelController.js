import ResponsavelModel from "../../../Models/ResponsavelModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id = request.params.id;

    const requestBody = request.body;

    const nome = requestBody.nome;
    const cpf = requestBody.cpf;
    const telefone = requestBody.telefone;

    const data = {};

    if (nome !== undefined) {
        data["nome"] = nome;
    }

    if (cpf !== undefined) {
        data["cpf"] = cpf;
    }

    if (telefone !== undefined) {
        data["telefone"] = telefone;
    }

    // Object.keys({a:1, b:2, c:3}) = [a,b,c]
    // [a,b,c].length = 3

    if (Object.keys(data).length === 0) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: `Nenhum campo foi inputado em ${id}`
        });
    }

    try {

        const [rowsAffected, [row]] = await ResponsavelModel.update(
            {
                nome_responsavel: nome,
                cpf_responsavel: cpf,
                telefone_responsavel: telefone
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
                error: `Nenhum responsavel encontrado com ID ${id}`
            });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};