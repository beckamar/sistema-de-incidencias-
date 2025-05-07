import pool from "../database/db.js";

export const getOtroTipoIncidenteService = async () => {
    const result = await pool.query('SELECT * FROM incidente_otro;');
    return result.rows;
};

export const postOtroTipoIncidenteService = async (id_incidente, tipo, descripcion) => {

    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const result = await client.query(`
            INSERT INTO incidente_otro (
            id_incidente, tipo, descripcion)
            VALUES ($1, $2, $3)
            RETURNING *;`, [id_incidente, tipo, descripcion]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
};