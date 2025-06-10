import ExampleModel from "../../Models/ExampleModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    /**
      POST, PUT podem ter request body!
      params sao as variaveis da propria rota
     */
    const requestBody = request.body;
    const id = request.params.id;

    const nome = requestBody.nome;
    const esta_ativo = requestBody.esta_ativo;

    const data = {};

    if (nome !== undefined) {
        data["nome"] = nome;
    }

    if (esta_ativo !== undefined) {
        data["esta_ativo"] = esta_ativo;
    }

    // Object.keys({a:1, b:2, c:3}) = [a,b,c]
    // [a,b,c].length = 3

    if (Object.keys(data).length === 0) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: `Nenhum campo foi inputado em ${id}`
        });
    }

    try {

        //Update retorna um array onde o primeiro item é quantas linhas foram alteradas e a segunda é um outro array com essas colunas
        //Claro que neste caso será apenas uma coluna

        const [rowsAffected, [row]] = await ExampleModel.update(
            {
                nome: nome, esta_ativo: esta_ativo
            },
            {
                where: {
                    id: id
                },
                returning: true // Retorna os dados gente!
            }
        );

        if (rowsAffected === 0 || !row) {
            return response.status(HTTP_STATUS.NOT_FOUND).json({
                error: `Nenhum registro encontrado com ID ${id}`
            });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};
