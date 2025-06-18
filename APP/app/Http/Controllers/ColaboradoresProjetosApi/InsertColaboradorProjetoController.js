import ColaboradorProjetoModel from "../../../Models/ColaboradorProjetoModel.js";

export default async (request, response) => {
    const HTTP_STATUS = CONSTANTS.HTTP;

    const { id_projeto, id_colaborador } = request.body;

    if (!id_projeto || !id_colaborador) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: 'Campos "title" e "id_colaborador" são obrigatórios.'
        });
    }

    try {
        const todo = await ColaboradorProjetoModel.create({
            id_projeto: id_projeto,
            id_colaborador: id_colaborador
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(todo);

    } catch (error) {

        /** Erro chave estrangeira não existe */
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            const fk_key = error.index;

            if (fk_key === "fk_pivo_colaborador") {
                return response.status(HTTP_STATUS.BAD_REQUEST).json({
                    error: `Colaborador com id ${id_colaborador} não existe.`
                });
            }

            return response.status(HTTP_STATUS.BAD_REQUEST).json({
                error: `Projeto com id ${id_projeto} não existe.`
            });
        }

        /** Erro chave composta unica id_colaborador id_projeto */
        if (error.name === 'SequelizeUniqueConstraintError') {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({
                error: `O colaborador ${id_colaborador} já está vinculado ao projeto ${id_projeto}.`
            });
        }

        console.log(error);

        // Outros erros inesperados
        return response.status(HTTP_STATUS.SERVER_ERROR).json({
            error: 'Erro interno ao criar a tarefa.'
        });
    }
};