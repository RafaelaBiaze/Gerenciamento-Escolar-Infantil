import UserModel from "../../../Models/UserModel.js";

//POST /api/users/image
//multiform data
//express file-upload
export default async (request, response) => {

    const arquivo = request.files.image;
    const idUser = request.user.id;

    if (!idUser) {
        return response
            .status(CONSTANTS.HTTP.NOT_FOUND)
            .json({ error: 'Usuário não encontrado' });
    }

    const newName = `${Date.now()}_${arquivo.name.replace(/\s+/g, '_')}`;

    const caminho = CONSTANTS.DIR + `/storage/images/${newName}`;

    const [rowsAffected, [row]] = await UserModel.update(
        {
            foto: newName
        },
        {
            where: {
                id: idUser
            },
            returning: true
        }
    );

    if (rowsAffected === 0) {
        return response
            .status(CONSTANTS.HTTP.NOT_FOUND)
            .json({ error: 'Usuário não encontrado' });
    }

    arquivo.mv(caminho, async (err) => {

        if (err) {

            const [rowsAffected, [row]] = await UserModel.update(
                {
                    foto: null
                },
                {
                    where: {
                        id: idUser
                    },
                    returning: true
                }
            );

            return response
                .status(CONSTANTS.HTTP.SERVER_ERROR)
                .json({ error: 'Erro ao salvar arquivo' });
        }



        return response
            .json({
                mensagem: 'Imagem enviada com sucesso!',
                image: newName
            });
    });

}