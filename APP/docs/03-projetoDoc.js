export default {
    "/api/projetos": {
        get: {
            summary: "Listar projetos",
            tags: ["Projetos"],
            parameters: [
                {
                    name: "limit",
                    in: "query",
                    schema: { type: "integer", default: 100 },
                    description: "Número máximo de projetos por página"
                },
                {
                    name: "offset",
                    in: "query",
                    schema: { type: "integer", default: 0 },
                    description: "Deslocamento para paginação"
                }
            ],
            responses: {
                200: { description: "Lista de projetos retornada com sucesso" },
                400: { description: "Limite inválido" },
                500: { description: "Erro de servidor" }
            }
        },
        post: {
            summary: "Criar novo projeto",
            tags: ["Projetos"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["nome"],
                            properties: {
                                nome: { type: "string" }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "Projeto criado com sucesso" },
                400: { description: "Campo nome obrigatório" },
                500: { description: "Erro interno ao criar projeto" }
            }
        }
    },

    "/api/projetos/{id}": {
        get: {
            summary: "Obter projeto por ID",
            tags: ["Projetos"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" }
                }
            ],
            responses: {
                200: { description: "Projeto encontrado com sucesso" },
                404: { description: "Projeto não encontrado" },
                500: { description: "Erro de servidor" }
            }
        },

        put: {
            summary: "Atualizar projeto por ID",
            tags: ["Projetos"],
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
                                nome: { type: "string" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Projeto atualizado com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Projeto não encontrado" },
                500: { description: "Erro de servidor" }
            }
        },

        delete: {
            summary: "Remover projeto por ID",
            tags: ["Projetos"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" }
                }
            ],
            responses: {
                204: { description: "Projeto removido com sucesso" },
                404: { description: "Projeto não encontrado" },
                500: { description: "Erro de servidor" }
            }
        }
    }
};