export default {
    "/api/colaboradores-projetos": {
        "post": {
            "summary": "Inserir relacionamento entre colaborador e projeto",
            "tags": ["Colaboradores-Projetos"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "id_colaborador": {
                                    "type": "integer",
                                    "description": "ID do colaborador"
                                },
                                "id_projeto": {
                                    "type": "integer",
                                    "description": "ID do projeto"
                                }
                            },
                            "required": ["id_colaborador", "id_projeto"]
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Relacionamento criado com sucesso"
                },
                "400": {
                    "description": "Erro de validação"
                }
            }
        }
    },
    "/api/colaboradores-projetos/{id_colaborador}/{id_projeto}": {
        "delete": {
            "summary": "Excluir relacionamento entre colaborador e projeto",
            "tags": ["Colaboradores-Projetos"],
            "parameters": [
                {
                    "name": "id_colaborador",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID do colaborador"
                },
                {
                    "name": "id_projeto",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    },
                    "description": "ID do projeto"
                }
            ],
            "responses": {
                "200": {
                    "description": "Relacionamento excluído com sucesso"
                },
                "404": {
                    "description": "Relacionamento não encontrado"
                }
            }
        }
    }
}