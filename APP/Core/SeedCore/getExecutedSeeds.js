import db from "../../config/db.js";

export default async function () {
    const { rows } = await db.query('SELECT name, step FROM seeds ORDER BY id DESC');

    const result = [];

    for (const row of rows) {
        result.push([row.name, row.step]);
    }

    return Object.fromEntries(result);
}