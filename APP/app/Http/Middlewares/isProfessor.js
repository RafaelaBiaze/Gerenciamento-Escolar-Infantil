export default (request, response, next) => {
    // Verifica se request.user existe (garantido pelo middleware de JWT anterior)
    // e se a role do usuário é 'admin' ou 'professor'
    try {
        const roleUser =request.user.role;
        const User = request.user;
        if (User && roleUser === 'Role_Admin' || User && roleUser === 'Role_Professor') {
            console.log(`Usuário é ${roleUser}. Prosseguindo.`);
            next(); // O usuário é admin ou professor, permite que a requisição continue
        } else {
            console.log('Acesso negado. Usuário não tem permissão ou informações de usuário ausentes.');
            return response.status(403).json({ message: 'Acesso proibido: Requer privilégios maiores.' });
        }
    } catch (error) {
        return response.status(500).json({ error: 'Erro interno no servidor' });
    }
};