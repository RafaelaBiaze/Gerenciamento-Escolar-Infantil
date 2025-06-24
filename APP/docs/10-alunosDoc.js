export default {
    "/api/alunos": {
        get: {
            summary: "Listar alunos",
            tags: ["Alunos"],
            parameters: [
                { name: "limit", in: "query", schema: { type: "integer", default: 100 }, description: "Número máximo de registros" },
                { name: "offset", in: "query", schema: { type: "integer", default: 0 }, description: "Deslocamento para paginação" },
                { name: "orderBy", in: "query", schema: { type: "string", default: "id,asc", enum: ["id,asc", "id,desc", "created_at,asc", "created_at,desc", "updated_at,asc", "updated_at,desc"] }, description: "Campo e direção de ordenação" }
            ],
            responses: {
                200: { description: "Lista de alunos" },
                400: { description: "Erro de validação (limit excedido)" }
            }
        },
        post: {
            summary: "Inserir aluno",
            tags: ["Alunos"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["turma", "registro_aluno", "nome", "data_nascimento"],
                            properties: {
                                turma: { type: "integer" },
                                registro_aluno: { type: "string" },
                                nome: { type: "string" },
                                data_nascimento: { type: "string", format: "date" }
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
    "/api/alunos/{id}": {
        get: {
            summary: "Obter aluno por ID",
            tags: ["Alunos"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                200: { description: "Aluno encontrado" },
                404: { description: "Não encontrado" }
            }
        },
        put: {
            summary: "Atualizar aluno",
            tags: ["Alunos"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                turma: { type: "integer" },
                                registro_aluno: { type: "string" },
                                nome: { type: "string" },
                                data_nascimento: { type: "string", format: "date" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Atualizado com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Aluno não encontrado" }
            }
        },
        delete: {
            summary: "Remover aluno",
            tags: ["Alunos"],
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: {
                204: { description: "Removido com sucesso" },
                404: { description: "Aluno não encontrado" }
            }
        }
    }
};