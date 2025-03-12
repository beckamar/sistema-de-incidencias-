import pool from "../config/db.js";

export const getEmpleadosService = async () =>  {
    const result = await pool.query('SELECT e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido, e.segundo_apellido, e.clave FROM empleado e');
    return result.rows[0];
};
export const getEmpleadoIdService = async (id) =>  {
    const result = await pool.query('SELECT * FROM empleado WHERE id = $1', [id]);
    return result.rows[0];
};