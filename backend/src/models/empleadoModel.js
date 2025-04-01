import pool from "../config/db.js";
import emptyToNull from "../utils/emptyToNull.js";

export const getEmpleadosService = async () =>  {
    const result = await pool.query('SELECT e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido, e.segundo_apellido, e.clave FROM empleado e');
    return result.rows[0];
};
export const getEmpleadoIdService = async (id) =>  {
    const result = await pool.query('SELECT * FROM empleado WHERE id = $1', [id]);
    return result.rows[0];
};

export const postEmpleadoService = async(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, clave) => {
    const client = await pool.connect()

    try {
        await client.query('BEGIN');
        const setPrimer_nombre = emptyToNull(primer_nombre);
        const setSegundo_nombre = emptyToNull(segundo_nombre);
        const setPrimer_apellido = emptyToNull(primer_apellido);
        const setSegundo_apellido = emptyToNull(segundo_apellido);
        const setClave = emptyToNull(clave);


        const result = await client.query(`        
            INSERT INTO empleado 
                (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, clave)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;`, [setPrimer_nombre, setSegundo_nombre, setPrimer_apellido, setSegundo_apellido, setClave]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
};