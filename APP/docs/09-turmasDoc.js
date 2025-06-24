export default {
    "/api/turmas": {
        get: {
            summary: "Listar turmas",
            tags: ["Turmas"],
            parameters: [
                { name: "limit", in: "query", schema: { type: "integer", default: 100 }, description: "Número máximo de registros" },
                { name: "offset", in: "query", schema: { type: "integer", default: 0 }, description: "Deslocamento para paginação" },
                { name: "orderBy", in: "query", schema: { type: "string", default: "id,asc", enum: ["id,asc", "id,desc", "created_at,asc", "created_at,desc", "updated_at,asc", "updated_at,desc"] }, description: "Campo e direção de ordenação" }
            ],
            responses: {
                200: { description: "Lista de turmas" },
                400: { description: "Erro de validação (limit excedido)" }
            }
        },
        post: {
            summary: "Inserir turma",
            tags: ["Turmas"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["professor", "sala", "periodo", "ano"],
                            properties: {
                                professor: { type: "integer" },
                                sala: { type: "string" },
                                periodo: { type: "string" },
                                ano: { type: "integer" }
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
    "/api/turmas/{id}": {
        get: {
            summary: "Obter turma por ID",
            tags: ["Turmas"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Turma encontrada" },
                404: { description: "Não encontrada" }
            }
        },
        put: {
            summary: "Atualizar turma",
            tags: ["Turmas"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                professor: { type: "integer" },
                                sala: { type: "string" },
                                periodo: { type: "string" },
                                ano: { type: "integer" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Atualizado com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Turma não encontrada" }
            }
        },
        delete: {
            summary: "Remover turma",
            tags: ["Turmas"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                204: { description: "Removido com sucesso" },
                404: { description: "Turma não encontrada" }
            }
        }
    }
};