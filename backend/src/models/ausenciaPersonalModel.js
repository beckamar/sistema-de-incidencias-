import pool from "../config/db.js";

export const getTiposAusenciaService = async () => {
    const result = await pool.query('SELECT * FROM catalogo_ausencias;');
    return result.rows;
};

export const postReporteAusenciaService = async (id_incidente, id_empleado, id_catalogoAusencias, descripcion) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(`
            INSERT INTO incidente_ausencia
                (id_incidente, id_empleado, id_catausencias, descripcion)
                VALUES ($1, $2, $3, $4)
                RETURNING *;`, [id_incidente, id_empleado, id_catalogoAusencias, descripcion]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
};
