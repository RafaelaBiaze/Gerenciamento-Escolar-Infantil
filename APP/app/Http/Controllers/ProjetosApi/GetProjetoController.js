import ColaboradorModel from "../../../Models/ColaboradorModel.js";
import ProjetoModel from "../../../Models/ProjetoModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id = request.params.id;

    try {

        const row = await ProjetoModel.findByPk(id, {
            include: {
                model: ColaboradorModel,
                as: "colaboradores"
            }
        });

        if (row === null) {
            return response.status(HTTP_STATUS.NOT_FOUND).json({ error: `Projeto com id ${id} não existe` });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};
