export default (request, response, next) => {
    // Verifica se request.user existe (garantido pelo middleware de JWT anterior)
    // e se a role do usuário é 'admin'
    try {
        if (request.user && request.user.role === 'Role_Admin') {
            console.log('Usuário é administrador. Prosseguindo.');
            next(); // O usuário é admin, permite que a requisição continue
        } else {
            console.log('Acesso negado. Usuário não é administrador ou informações de usuário ausentes.');
            return response.status(403).json({ message: 'Acesso proibido: Requer privilégios de administrador.' });
        }
    } catch (error) {
        return response.status(500).json({ error: 'Erro interno no servidor' });
    }
};