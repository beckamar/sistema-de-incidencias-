import pool from "../config/db.js";

export const getTiposAusenciaService = async () => {
    const result = await pool.query('SELECT * FROM catalogo_ausencias;');
    return result.rows;
};
