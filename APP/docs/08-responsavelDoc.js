export default {
    "/api/responsavel": {
        get: {
            summary: "Listar responsáveis",
            tags: ["Responsavel"],
            parameters: [
                { name: "limit", in: "query", schema: { type: "integer", default: 100 }, description: "Número máximo de registros" },
                { name: "offset", in: "query", schema: { type: "integer", default: 0 }, description: "Deslocamento para paginação" },
                { name: "orderBy", in: "query", schema: { type: "string", default: "id,asc", enum: ["id,asc", "id,desc", "created_at,asc", "created_at,desc", "updated_at,asc", "updated_at,desc"] }, description: "Campo e direção de ordenação" }
            ],
            responses: {
                200: { description: "Lista de responsáveis" },
                400: { description: "Erro de validação (limit excedido)" }
            }
        },
        post: {
            summary: "Inserir responsável",
            tags: ["Responsavel"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["nome", "cpf", "telefone"],
                            properties: {
                                nome: { type: "string" },
                                cpf: { type: "string" },
                                telefone: { type: "string" }
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
    "/api/responsavel/{id}": {
        get: {
            summary: "Obter responsável por ID",
            tags: ["Responsavel"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Responsável encontrado" },
                404: { description: "Não encontrado" }
            }
        },
        put: {
            summary: "Atualizar responsável",
            tags: ["Responsavel"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                nome: { type: "string" },
                                cpf: { type: "string" },
                                telefone: { type: "string" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Atualizado com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Responsável não encontrado" }
            }
        },
        delete: {
            summary: "Remover responsável",
            tags: ["Responsavel"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                204: { description: "Removido com sucesso" },
                404: { description: "Responsável não encontrado" }
            }
        }
    }
};