export default {
    "/api/presenca": {
        get: {
            summary: "Listar presenças",
            tags: ["Presenca"],
            parameters: [
                { name: "limit", in: "query", schema: { type: "integer", default: 100 }, description: "Número máximo de registros" },
                { name: "offset", in: "query", schema: { type: "integer", default: 0 }, description: "Deslocamento para paginação" },
                { name: "orderBy", in: "query", schema: { type: "string", default: "id,asc", enum: ["id,asc", "id,desc", "created_at,asc", "created_at,desc", "updated_at,asc", "updated_at,desc"] }, description: "Campo e direção de ordenação" }
            ],
            responses: {
                200: { description: "Lista de presenças" },
                400: { description: "Erro de validação (limit excedido)" }
            }
        },
        post: {
            summary: "Inserir presença",
            tags: ["Presenca"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["aluno", "data", "comparecimento"],
                            properties: {
                                aluno: { type: "integer" },
                                data: { type: "string", format: "date" },
                                comparecimento: { type: "boolean" }
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
    "/api/presenca/{id}": {
        get: {
            summary: "Obter presença por ID",
            tags: ["Presenca"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Presença encontrada" },
                404: { description: "Não encontrada" }
            }
        },
        put: {
            summary: "Atualizar presença",
            tags: ["Presenca"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                aluno: { type: "integer" },
                                data: { type: "string", format: "date" },
                                comparecimento: { type: "boolean" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Atualizado com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Presença não encontrada" }
            }
        },
        delete: {
            summary: "Remover presença",
            tags: ["Presenca"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                204: { description: "Removido com sucesso" },
                404: { description: "Presença não encontrada" }
            }
        }
    }
};