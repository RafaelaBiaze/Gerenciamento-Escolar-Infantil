export default {
    "/api/professores": {
        get: {
            summary: "Listar professores",
            tags: ["Professores"],
            parameters: [
                { name: "limit", in: "query", schema: { type: "integer", default: 100 }, description: "Número máximo de registros" },
                { name: "offset", in: "query", schema: { type: "integer", default: 0 }, description: "Deslocamento para paginação" },
                { name: "orderBy", in: "query", schema: { type: "string", default: "id,asc", enum: ["id,asc", "id,desc", "created_at,asc", "created_at,desc", "updated_at,asc", "updated_at,desc"] }, description: "Campo e direção de ordenação" }
            ],
            responses: {
                200: { description: "Lista de professores" },
                400: { description: "Erro de validação (limit excedido)" }
            }
        },
        post: {
            summary: "Inserir professor",
            tags: ["Professores"],
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
    "/api/professores/{id}": {
        get: {
            summary: "Obter professor por ID",
            tags: ["Professores"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Professor encontrado" },
                404: { description: "Não encontrado" }
            }
        },
        put: {
            summary: "Atualizar professor",
            tags: ["Professores"],
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
                404: { description: "Professor não encontrado" }
            }
        },
        delete: {
            summary: "Remover professor",
            tags: ["Professores"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                204: { description: "Removido com sucesso" },
                404: { description: "Professor não encontrado" }
            }
        }
    }
};