export default {
    "/api/colaboradores": {
        get: {
            summary: "Listar colaboradores",
            tags: ["Colaboradores"],
            parameters: [
                {
                    name: "limit",
                    in: "query",
                    schema: { type: "integer", default: 100 },
                    description: "Número máximo de registros"
                },
                {
                    name: "offset",
                    in: "query",
                    schema: { type: "integer", default: 0 },
                    description: "Deslocamento para paginação"
                },
                {
                    name: "orderBy",

                    in: "query",
                    schema: {
                        type: "string",
                        default: "id,asc",
                        enum: ["id,asc", "id,desc", "created_at,asc", "created_at,desc", "updated_at,asc", "updated_at,desc"],
                    },
                    description: "Campo e direção de ordenação"
                }
            ],
            responses: {
                200: {
                    description: "Lista de colaboradores"
                },
                400: {
                    description: "Erro de validação (limit excedido)"
                }
            }
        },
        post: {
            summary: "Inserir colaborador",
            tags: ["Colaboradores"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["nome"],
                            properties: {
                                nome: { type: "string" },
                                esta_ativo: { type: "boolean", default: true }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "Criado com sucesso" },
                400: { description: "Campo nome obrigatório" }
            }
        }
    },
    "/api/colaboradores/{id}": {
        get: {
            summary: "Obter colaborador por ID",
            tags: ["Colaboradores"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                200: { description: "Colaborador encontrado" },
                404: { description: "Não encontrado" }
            }
        },
        put: {
            summary: "Atualizar colaborador",
            tags: ["Colaboradores"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                nome: { type: "string" },
                                esta_ativo: { type: "boolean" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Atualizado com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Colaborador não encontrado" }
            }
        },
        delete: {
            summary: "Remover colaborador",
            tags: ["Colaboradores"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                204: { description: "Removido com sucesso" },
                404: { description: "Colaborador não encontrado" }
            }
        }
    }
};