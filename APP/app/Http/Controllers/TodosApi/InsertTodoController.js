import TodoModel from "../../../Models/TodoModel.js";

export default async (request, response) => {
    const HTTP_STATUS = CONSTANTS.HTTP;

    const { title, id_colaborador } = request.body;

    if (!title || !id_colaborador) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: 'Campos "title" e "id_colaborador" são obrigatórios.'
        });
    }

    try {
        const todo = await TodoModel.create({
            title,
            id_colaborador
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(todo);

    } catch (error) {

        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({
                error: `Colaborador com id ${id_colaborador} não existe.`
            });
        }

        // Outros erros inesperados
        return response.status(HTTP_STATUS.SERVER_ERROR).json({
            error: 'Erro interno ao criar a tarefa.'
        });
    }
};