import db from "../../config/db.js";

export default (function () {
    const TABLE = "tabela_exemplo";

    const HTTP_STATUS = CONSTANTS.HTTP;

    return {

        // GET /exemplo
        list: async (request, response) => {
            try {
                const result = await db.query(`SELECT * FROM ${TABLE} ORDER BY id`);
                return response.status(HTTP_STATUS.SUCCESS).json({ rows: result.rows });
            } catch (err) {
                console.error(err);
                return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Erro ao listar registros.' });
            }
        },

        // GET /exemplo/:id
        get: async (request, response) => {
            const { id } = request.params;
            try {
                const result = await db.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
                if (result.rowCount === 0) {
                    return response.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Registro não encontrado.' });
                }
                return response.status(HTTP_STATUS.SUCCESS).json(result.rows[0]);
            } catch (err) {
                console.error(err);
                return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Erro ao buscar registro.' });
            }
        },

        // POST /exemplo
        insert: async (request, response) => {
            const { nome, esta_ativo = false } = request.body;
            if (!nome) {
                return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Campo "nome" é obrigatório.' });
            }

            try {
                const result = await db.query(
                    `INSERT INTO ${TABLE} (nome, esta_ativo) VALUES ($1, $2) RETURNING *`,
                    [nome, esta_ativo]
                );
                return response.status(HTTP_STATUS.SUCCESS_CREATED).json(result.rows[0]);
            } catch (err) {
                console.error(err);
                return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Erro ao inserir registro.' });
            }
        },

        // PUT /exemplo/:id
        update: async (request, response) => {
            const { id } = request.params;
            const { nome, esta_ativo } = request.body;

            if (!nome) {
                return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Campo "nome" é obrigatório.' });
            }

            try {
                const result = await db.query(
                    `UPDATE ${TABLE} SET nome = $1, esta_ativo = $2 WHERE id = $3 RETURNING *`,
                    [nome, esta_ativo, id]
                );
                if (result.rowCount === 0) {
                    return response.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Registro não encontrado para atualização.' });
                }
                return response.status(HTTP_STATUS.SUCCESS).json(result.rows[0]);
            } catch (err) {
                console.error(err);
                return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Erro ao atualizar registro.' });
            }
        },

        // DELETE /exemplo/:id
        delete: async (request, response) => {
            const { id } = request.params;
            try {
                const result = await db.query(
                    `DELETE FROM ${TABLE} WHERE id = $1 RETURNING *`,
                    [id]
                );
                if (result.rowCount === 0) {
                    return response.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Registro não encontrado para exclusão.' });
                }
                return response.status(HTTP_STATUS.SUCCESS_NO_CONTENT).send();
            } catch (err) {
                console.error(err);
                return response.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Erro ao excluir registro.' });
            }
        },

    };
})();
