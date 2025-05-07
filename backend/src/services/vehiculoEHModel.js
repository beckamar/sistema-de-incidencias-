import pool from "../database/db.js";


export const getCategoriasVehiculoEHService = async () => {
    const result = await pool.query('SELECT * FROM categorias_vehiculoeh;');
    return result.rows;
};

export const postReporteVehiculoEHService = async (id_incidente, id_categoria, clave, descripcion ) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(`
            INSERT INTO incidente_vehiculoeh
                (id_incidente, id_categoria, clave, descripcion)
                VALUES ($1, $2, $3, $4)
                RETURNING *;`, [id_incidente, id_categoria, clave, descripcion]);
            await client.query('COMMIT');
            return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
};
