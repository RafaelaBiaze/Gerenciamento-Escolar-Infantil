export default {
    "/api/atividades": {
        get: {
            summary: "Listar atividades",
            tags: ["Atividades"],
            parameters: [
                { name: "limit", in: "query", schema: { type: "integer", default: 100 }, description: "Número máximo de registros" },
                { name: "offset", in: "query", schema: { type: "integer", default: 0 }, description: "Deslocamento para paginação" },
                { name: "orderBy", in: "query", schema: { type: "string", default: "id,asc", enum: ["id,asc", "id,desc", "created_at,asc", "created_at,desc", "updated_at,asc", "updated_at,desc"] }, description: "Campo e direção de ordenação" }
            ],
            responses: {
                200: { description: "Lista de atividades" },
                400: { description: "Erro de validação (limit excedido)" }
            }
        },
        post: {
            summary: "Inserir atividade",
            tags: ["Atividades"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["turma", "professor", "nome", "data"],
                            properties: {
                                turma: { type: "integer" },
                                professor: { type: "integer" },
                                nome: { type: "string" },
                                descricao: { type: "string" },
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
    "/api/atividades/{id}": {
        get: {
            summary: "Obter atividade por ID",
            tags: ["Atividades"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Atividade encontrada" },
                404: { description: "Não encontrada" }
            }
        },
        put: {
            summary: "Atualizar atividade",
            tags: ["Atividades"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                turma: { type: "integer" },
                                professor: { type: "integer" },
                                nome: { type: "string" },
                                descricao: { type: "string" },
                                data: { type: "string", format: "date" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Atualizado com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Atividade não encontrada" }
            }
        },
        delete: {
            summary: "Remover atividade",
            tags: ["Atividades"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                204: { description: "Removido com sucesso" },
                404: { description: "Atividade não encontrada" }
            }
        }
    }
};