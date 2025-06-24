import ProfessorModel from "../../../Models/ProfessorModel.js"
import UserModel from "../../../Models/UserModel.js"

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const orderBy_fields = [
        "id",
        "updated_at",
        "created_at"
    ];

    const orderBy_direction = [
        "asc",
        "desc"
    ]

    const limit = parseInt(request.query.limit) || 100;
    const offset = parseInt(request.query.offset) || 0;
    const orderBy = request.query.orderBy || "id,asc";

    if (limit > CONSTANTS.MAX_GET_LIMIT) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: `Limit máximo: ${CONSTANTS.MAX_GET_LIMIT}.` });
    }

    const [field, direction] = orderBy.split(",");

    if (
        !orderBy_fields.includes(field) ||
        !orderBy_direction.includes(direction)
    ) {
        return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: `orderBy está errado.` });
    }

    try {

        const data = await ProfessorModel.findAll({
            limit: limit + 1,
            offset: offset,
            order: [[field, direction]],
            include: [
                {
                    model: UserModel,
                    as: "user",
                    attributes: ['login', 'email']
                }
            ]
        });

        const hasMore = (data.length > limit);

        const rows = (hasMore) ? (data.slice(0, limit)) : (data);
        const next = (hasMore) ? (offset + limit) : (null);

        return response.status(HTTP_STATUS.SUCCESS).json({
            rows: rows,
            limit: limit,
            next: next
        });

    } catch (error) {
        console.log(error);
        return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error de servidor.' })
    }

};