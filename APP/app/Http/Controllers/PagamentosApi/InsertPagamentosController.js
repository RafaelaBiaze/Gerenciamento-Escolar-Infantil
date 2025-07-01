import PagamentoModel from "../../../Models/PagamentoModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const requestBody = request.body;

    const aluno = requestBody.aluno || null;
    const responsavel = requestBody.responsavel || null;
    const formaPagamento = requestBody.forma_pagamento || null;
    const valor = requestBody.valor || null;
    const statusPagamento = requestBody.status_pagamento || 'pendente';
    const data_pagamento = requestBody.data || null;

    if (
        aluno === null ||
        responsavel === null ||
        formaPagamento === null
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {

        const row = await PagamentoModel.create({
            id_aluno: aluno,
            id_responsavel: responsavel,
            forma_pagamento: formaPagamento,
            valor: valor,
            status_pagamento: statusPagamento,
            data_pagamento: data_pagamento
        });

        return response.status(HTTP_STATUS.SUCCESS_CREATED).json(row);

    } catch (error) {

        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' });

    }

};