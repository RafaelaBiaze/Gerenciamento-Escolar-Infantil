import AlunoResponsavelModel from "../../../Models/AlunoResponsavelModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id_aluno = request.params.id_aluno;
    const id_responsavel = request.params.id_responsavel;

    try {

        const rowsDeleted = await AlunoResponsavelModel.destroy({
            where: {
                id_aluno: id_aluno,
                id_responsavel: id_responsavel
            }
        });

        if (rowsDeleted === 0) {
            return response.status(HTTP_STATUS.NOT_FOUND)
                .json({ error: `Não existe relacionamento entre aluno ID ${id_aluno} e responsavel ID ${id_responsavel}!` });
        }

        return response.status(HTTP_STATUS.SUCCESS_NO_CONTENT).send();

    } catch (error) {

        console.log(error);
        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};
