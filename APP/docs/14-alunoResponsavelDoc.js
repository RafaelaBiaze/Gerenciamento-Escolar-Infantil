export default {
    "/api/alunos-responsaveis": {
        "post": {
            "summary": "Inserir relacionamento entre aluno e responsável",
            "tags": ["Alunos-Responsaveis"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "id_aluno": {
                                    "type": "integer",
                                    "description": "ID do aluno"
                                },
                                "id_responsavel": {
                                    "type": "integer",
                                    "description": "ID do responsável"
                                }
                            },
                            "required": ["id_aluno", "id_responsavel"]
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Relacionamento criado com sucesso"
                },
                "400": {
                    "description": "Erro de validação, relacionamento já existe ou chave estrangeira não encontrada"
                },
                "500": {
                    "description": "Erro interno ao criar o relacionamento"
                }
            }
        }
    },
    "/api/alunos-responsaveis/{id_aluno}/{id_responsavel}": {
        "delete": {
            "summary": "Excluir relacionamento entre aluno e responsável",
            "tags": ["Alunos-Responsaveis"],
            "parameters": [
                {
                    "name": "id_aluno",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID do aluno"
                },
                {
                    "name": "id_responsavel",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID do responsável"
                }
            ],
            "responses": {
                "204": {
                    "description": "Relacionamento excluído com sucesso"
                },
                "404": {
                    "description": "Relacionamento não encontrado"
                },
                "500": {
                    "description": "Erro interno ao excluir o relacionamento"
                }
            }
        }
    }
};