export default {
    "/api/todos": {
        get: {
            summary: "Listar tarefas",
            tags: ["To-dos"],
            parameters: [
                {
                    name: "limit",
                    in: "query",
                    schema: { type: "integer", default: 100 },
                    description: "Número máximo de tarefas por página"
                },
                {
                    name: "offset",
                    in: "query",
                    schema: { type: "integer", default: 0 },
                    description: "Deslocamento para paginação"
                }
            ],
            responses: {
                200: { description: "Lista de tarefas retornada com sucesso" },
                400: { description: "Limite inválido" },
                500: { description: "Erro de servidor" }
            }
        },
        post: {
            summary: "Criar nova tarefa",
            tags: ["To-dos"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["title", "id_colaborador"],
                            properties: {
                                title: { type: "string" },
                                id_colaborador: { type: "integer" }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "Tarefa criada com sucesso" },
                400: { description: "Campos obrigatórios ausentes ou colaborador inválido" },
                500: { description: "Erro interno ao criar a tarefa" }
            }
        }
    },

    "/api/todos/{id}": {
        get: {
            summary: "Obter tarefa por ID",
            tags: ["To-dos"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" }
                }
            ],
            responses: {
                200: { description: "Tarefa encontrada" },
                404: { description: "Tarefa não encontrada" },
                500: { description: "Erro de servidor" }
            }
        },

        put: {
            summary: "Atualizar tarefa por ID",
            tags: ["To-dos"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                is_checked: { type: "boolean" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Tarefa atualizada com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Tarefa não encontrada" },
                500: { description: "Erro de servidor" }
            }
        },

        delete: {
            summary: "Excluir tarefa por ID",
            tags: ["To-dos"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" }
                }
            ],
            responses: {
                204: { description: "Tarefa removida com sucesso" },
                404: { description: "Tarefa não encontrada" },
                500: { description: "Erro de servidor" }
            }
        }
    }
};
