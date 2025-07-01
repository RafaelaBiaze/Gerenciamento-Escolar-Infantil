import PagamentoModel from "../../../Models/PagamentoModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const id = request.params.id;

    const requestBody = request.body;

    const aluno = requestBody.aluno;
    const responsavel = requestBody.responsavel;
    const formaPagamento = requestBody.forma_pagamento;
    const valor = requestBody.valor;
    const statusPagamento = requestBody.status_pagamento;
    const data_pagamento = requestBody.data;

    const data = {};

    if (aluno !== undefined) {
        data["aluno"] = aluno;
    }

    if (responsavel !== undefined) {
        data["responsavel"] = responsavel;
    }

    if (formaPagamento !== undefined) {
        data["forma_pagamento"] = formaPagamento;
    }
    
    if (valor !== undefined) {
        data["valor"] = valor;
    }
    
    if (statusPagamento !== undefined) {
        data["status_pagamento"] = statusPagamento;
    }
    
    if (data_pagamento !== undefined) {
        data["data_pagamento"] = data_pagamento;
    }

    // Object.keys({a:1, b:2, c:3}) = [a,b,c]
    // [a,b,c].length = 3

    if (Object.keys(data).length === 0) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({
            error: `Nenhum campo foi inputado em ${id}`
        });
    }

    try {

        const [rowsAffected, [row]] = await PagamentoModel.update(
            {
                id_aluno: aluno,
                id_responsavel: responsavel,
                forma_pagamento: formaPagamento,
                valor: valor,
                status_pagamento: statusPagamento,
                data_pagamento: data_pagamento
            },
            {
                where: {
                    id: id
                },
                returning: true
            }
        );

        if (rowsAffected === 0 || !row) {
            return response.status(HTTP_STATUS.NOT_FOUND).json({
                error: `Nenhum pagamento encontrado com ID ${id}`
            });
        }

        return response.status(HTTP_STATUS.SUCCESS).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};