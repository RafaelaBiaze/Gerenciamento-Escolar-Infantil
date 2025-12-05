export interface User {
    id?: number;
    login: string;
    email: string;
    senha?: string;
    id_role: number;
}

export interface Professor {
    id?: number;
    nome_professor: string;
    cpf_professor: string;
    telefone_professor: string;
    id_user?: number; // Para vincular a um usuário
}

export interface LoginResponse {
    token: string;
    user: User;
}