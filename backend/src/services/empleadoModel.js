import pool from "../database/db.js";

export const getEmpleadosService = async () =>  {
    const result = await pool.query('SELECT e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido, e.segundo_apellido, e.clave FROM empleado e');
    return result.rows[0];
};
export const getEmpleadoIdService = async (id) =>  {
    const result = await pool.query('SELECT * FROM empleado WHERE id = $1', [id]);
    return result.rows[0];
};

export const postEmpleadoService = async(nombre_completo, clave) => {
    const client = await pool.connect()

    try {
        await client.query('BEGIN');

        const result = await client.query(`        
            INSERT INTO empleado 
                (nombre_completo, clave)
                VALUES ($1, $2)
                RETURNING id_empleado, nombre_completo, clave;`, [nombre_completo, clave]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
};