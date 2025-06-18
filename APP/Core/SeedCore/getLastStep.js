import db from "../../config/db.js";

export default async function () {
    const res = await db.query('SELECT MAX(step) AS max FROM seeds');
    const max = res.rows[0].max;
    return (max ?? 0);
}