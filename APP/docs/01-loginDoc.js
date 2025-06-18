export default {
    "/login": {
        "post": {
            "summary": "Autenticação de usuário",
            "description": "Realiza o login do usuário e retorna um token JWT para autenticação.",
            "tags": ["Autenticação"],
            "requestBody": {
                "required": true,
                "content": {
                    "application/x-www-form-urlencoded": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "description": "E-mail do usuário",
                                    "example": "user@example.com"
                                },
                                "senha": {
                                    "type": "string",
                                    "description": "Senha do usuário",
                                    "example": "123456"
                                }
                            },
                            "required": ["email", "senha"]
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Login realizado com sucesso",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "token": {
                                        "type": "string",
                                        "description": "Token JWT para autenticação"
                                    },
                                    "expires_at": {
                                        "type": "string",
                                        "format": "date-time",
                                        "description": "Data e hora de expiração do token"
                                    }
                                }
                            }
                        }
                    }
                },
                "401": {
                    "description": "Credenciais inválidas"
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