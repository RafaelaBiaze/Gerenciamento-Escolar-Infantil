export default {
    "/api/pagamentos": {
        get: {
            summary: "Listar pagamentos",
            tags: ["Pagamentos"],
            parameters: [
                { name: "limit", in: "query", schema: { type: "integer", default: 100 }, description: "Número máximo de registros" },
                { name: "offset", in: "query", schema: { type: "integer", default: 0 }, description: "Deslocamento para paginação" },
                { name: "orderBy", in: "query", schema: { type: "string", default: "id,asc", enum: ["id,asc", "id,desc", "created_at,asc", "created_at,desc", "updated_at,asc", "updated_at,desc"] }, description: "Campo e direção de ordenação" }
            ],
            responses: {
                200: { description: "Lista de pagamentos" },
                400: { description: "Erro de validação (limit excedido ou orderBy inválido)" }
            }
        },
        post: {
            summary: "Inserir pagamento",
            tags: ["Pagamentos"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["aluno", "responsavel", "forma_pagamento"],
                            properties: {
                                aluno: { type: "integer" },
                                responsavel: { type: "integer" },
                                forma_pagamento: { type: "string" },
                                valor: { type: "number" },
                                status_pagamento: { type: "string", default: "pendente" },
                                data: { type: "string", format: "date" }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "Criado com sucesso" },
                400: { description: "Campos obrigatórios ausentes" }
            }
        }
    },
    "/api/pagamentos/{id}": {
        get: {
            summary: "Obter pagamento por ID",
            tags: ["Pagamentos"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Pagamento encontrado" },
                404: { description: "Não encontrado" }
            }
        },
        put: {
            summary: "Atualizar pagamento",
            tags: ["Pagamentos"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                aluno: { type: "integer" },
                                responsavel: { type: "integer" },
                                forma_pagamento: { type: "string" },
                                valor: { type: "number" },
                                status_pagamento: { type: "string" },
                                data: { type: "string", format: "date" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Atualizado com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Pagamento não encontrado" }
            }
        },
        delete: {
            summary: "Remover pagamento",
            tags: ["Pagamentos"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                204: { description: "Removido com sucesso" },
                404: { description: "Pagamento não encontrado" }
            }
        }
    }
};