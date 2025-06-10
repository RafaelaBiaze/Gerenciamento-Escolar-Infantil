import ExampleModel from "../../Models/ExampleModel.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    /**
        Query vars em http://dominio/path?var1=1&var2=teste

        request.query = {
            var1 : 1, 
            var2: "teste"
        }
   */

    /**
        nesse caso, esperamos http://dominio/path?lmit=x&offset=y
     */

    const limit = parseInt(request.query.limit) || 100;
    const offset = parseInt(request.query.offset) || 0;

    if (limit > CONSTANTS.MAX_GET_LIMIT) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: `Limit máximo: ${CONSTANTS.MAX_GET_LIMIT}.` });
    }

    try {

        // Lembrem-se do algoritmo de paginação limit + 1

        const data = await ExampleModel.findAll({
            limit: limit + 1,
            offset: offset,
            order: [["id", "asc"]]
        });

        const hasMore = (data.length > limit);

        // .slice para remover o último elemento de limit + 1, ficando somente limit

        const rows = (hasMore) ? (data.slice(0, limit)) : (data);
        const next = (hasMore) ? (offset + limit) : (null);

        return response.status(HTTP_STATUS.SUCCESS).json({
            rows: rows,
            limit: limit,
            next: next
        });

    } catch (error) {
        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' })
    }

};
