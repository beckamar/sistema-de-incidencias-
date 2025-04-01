import pool from "../config/db.js";

export const getEmpleadosService = async () =>  {
    const result = await pool.query('SELECT e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido, e.segundo_apellido, e.clave FROM empleado e');
    return result.rows[0];
};
export const getEmpleadoIdService = async (id) =>  {
    const result = await pool.query('SELECT * FROM empleado WHERE id = $1', [id]);
    return result.rows[0];
};

export const postEmpleadoService = async(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, clave) => {
    
    const setSegundo_nombre = segundo_nombre === ""? null: segundo_nombre;
    const setClave = clave === ""? null: clave;

    const result = await pool.query(`        
        INSERT INTO empleado 
            (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, clave)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`, [primer_nombre, setSegundo_nombre, primer_apellido, segundo_apellido, setClave]);
    return result.rows[0];
};