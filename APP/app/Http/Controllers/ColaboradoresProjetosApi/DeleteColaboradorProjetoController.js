import ColaboradorProjetoModel from "../../../Models/ColaboradorProjetoModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id_colaborador = request.params.id_colaborador;
    const id_projeto = request.params.id_projeto;

    try {

        const rowsDeleted = await ColaboradorProjetoModel.destroy({
            where: {
                id_colaborador: id_colaborador,
                id_projeto: id_projeto
            }
        });

        if (rowsDeleted === 0) {
            return response.status(HTTP_STATUS.NOT_FOUND)
                .json({ error: `PNão existe relacionamento entre colaborador ID ${id_projeto} e projeto ID ${id_projeto}!` });
        }

        return response.status(HTTP_STATUS.SUCCESS_NO_CONTENT).send();

    } catch (error) {

        console.log(error);
        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};
