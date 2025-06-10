import ExampleModel from "../../Models/ExampleModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    /**
      Params: variaveis da pŕopria rota :id
     */
    const id = request.params.id;

    try {

        const row = await ExampleModel.findByPk(id);

        if (row === null) {
            return response.status(HTTP_STATUS.NOT_FOUND).json({ error: `Registro com id ${id} não existe` });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};
