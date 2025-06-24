import ResponsavelModel from "../../../Models/ResponsavelModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id = request.params.id;

    try {

        const row = await ResponsavelModel.findByPk(id);

        if (row === null) {
            return response.status(HTTP_STATUS.NOT_FOUND).json({ error: `Responsavel com id ${id} não existe` });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};