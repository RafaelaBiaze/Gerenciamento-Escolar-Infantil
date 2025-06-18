export default {
    "/api/users/image": {
        "post": {
            "summary": "Upload de imagem de perfil",
            "description": "Faz o upload de uma imagem de perfil para um usuário específico. A imagem será salva no servidor e o campo `foto` do usuário será atualizado no banco de dados. Apenas arquivos com extensões permitidas serão aceitos.",
            "tags": ["Usuários"],
            "parameters": [

            ],
            "requestBody": {
                "required": true,
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "image": {
                                    "type": "string",
                                    "format": "binary",
                                    "description": "Arquivo de imagem a ser enviado"
                                }
                            },
                            "required": ["image"]
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Imagem enviada com sucesso",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Imagem enviada com sucesso"
                                    },
                                    "imagem": {
                                        "type": "string",
                                        "description": "Nome do arquivo salvo no servidor",
                                        "example": "1678901234567_image.png"
                                    }
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Extensão de arquivo não permitida",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "example": "Extensão de arquivo não permitida. Permitidos: .png, .jpg, .jpeg, .webp, .gif, .svg"
                                    }
                                }
                            }
                        }
                    }
                },
                "404": {
                    "description": "Usuário não encontrado",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "example": "Usuário não encontrado"
                                    }
                                }
                            }
                        }
                    }
                },
                "500": {
                    "description": "Erro ao mover o arquivo ou atualizar o banco de dados",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "error": {
                                        "type": "string",
                                        "example": "Erro ao salvar a imagem no servidor"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}