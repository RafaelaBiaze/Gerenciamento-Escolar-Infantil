export default {
    "/api/alunos": {
        "get": {
            "tags": ["Alunos"],
            "summary": "Lista alunos com suas matérias",
            "description": "Retorna uma lista paginada de alunos com as matérias relacionadas. Requer autenticação via token JWT.",
            "parameters": [
                {
                    "name": "limit",
                    "in": "query",
                    "description": "Número máximo de registros a retornar (limite máximo definido pelo servidor)",
                    "required": false,
                    "schema": {
                        "type": "integer",
                        "default": 10
                    }
                },
                {
                    "name": "offset",
                    "in": "query",
                    "description": "Número de registros a pular (para paginação)",
                    "required": false,
                    "schema": {
                        "type": "integer",
                        "default": 0
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Lista de alunos",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "limit": {
                                        "type": "integer"
                                    },
                                    "next": {
                                        "type": ["integer", "null"]
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Erro de validação (limit excedido)",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "401": {
                    "description": "Token ausente, inválido ou expirado",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Erro interno no servidor"
                }
            },
            "security": [
                {
                    "bearerAuth": []
                }
            ]
        }
    }
};