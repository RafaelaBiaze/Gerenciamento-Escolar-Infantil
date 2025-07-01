import AlunoResponsavelModel from "../../../Models/AlunoResponsavelModel.js";

export default async (request, response) => {
    const HTTP_STATUS = CONSTANTS.HTTP;

    const { id_aluno , id_responsavel } = request.body;

    if (!id_aluno || !id_responsavel) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: 'Campos "id_aluno" e "id_responsavel" são obrigatórios.'
        });
    }

    try {
        const alunoRes = await AlunoResponsavelModel.create({
            id_aluno: id_aluno,
            id_responsavel: id_responsavel
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(alunoRes);

    } catch (error) {

        /** Erro chave estrangeira não existe */
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            const fk_key = error.index;

            if (fk_key === "fk_aluno") {
                return response.status(HTTP_STATUS.BAD_REQUEST).json({
                    error: `Aluno com id ${id_aluno} não existe.`
                });
            }

            return response.status(HTTP_STATUS.BAD_REQUEST).json({
                error: `Responsavel com id ${id_responsavel} não existe.`
            });
        }

        /** Erro chave composta unica id_colaborador id_projeto */
        if (error.name === 'SequelizeUniqueConstraintError') {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({
                error: `O aluno ${id_aluno} já está vinculado ao responsavel ${id_responsavel}.`
            });
        }

        console.log(error);

        // Outros erros inesperados
        return response.status(HTTP_STATUS.SERVER_ERROR).json({
            error: 'Erro interno ao criar a tarefa.'
        });
    }
};