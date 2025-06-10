import ExampleModel from "../../Models/ExampleModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    /**
      POST, PUT podem ter request body!
     */
    const requestBody = request.body;

    const nome = requestBody.nome || null;
    const esta_ativo = requestBody.esta_ativo || true;

    if (nome === null) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Campo "nome" não preenchido.' });
    }


    try {

        const row = await ExampleModel.create({
            nome: nome,
            esta_ativo: esta_ativo
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};
