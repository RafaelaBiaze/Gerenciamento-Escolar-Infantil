import jwt from 'jsonwebtoken';

export default (request, response, next) => {

    /** No request tambem podemos trabalhar com o request */
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // pega o valor após 'Bearer '

    try {
        const userDecoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = userDecoded;
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return response.status(401).json({ error: 'Token expirado' });
        } else if (err.name === 'JsonWebTokenError') {
            return response.status(401).json({ error: 'Token inválido' });
        } else {
            return response.status(401).json({ error: 'Erro' });
        }

    }

}