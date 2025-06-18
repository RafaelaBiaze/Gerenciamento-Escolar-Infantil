import path from 'path';

export default (request, response, next) => {

    if (!request.files || !request.files.image) {
        return response.status(CONSTANTS.HTTP.BAD_REQUEST)
            .json({ error: 'Arquivo não enviado' });
    }

    const tiposPermitidos = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];

    const arquivo = request.files.image;
    const extensao = path.extname(arquivo.name).toLowerCase();

    if (!tiposPermitidos.includes(extensao)) {
        return response.status(CONSTANTS.HTTP.BAD_REQUEST)
            .json({ error: `Tipo de arquivo inválido: ${extensao}` });
    }

    return next();

}