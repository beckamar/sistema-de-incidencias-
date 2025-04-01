import pool from "../config/db.js";

export const getIncidentesService = async () =>  {
    const result = await pool.query(`
        SELECT 
        i.id_incidente, 
        i.fecha_reporte, 
        i.hora_reporte, 
        ci.tipo AS tipo_incidente, 
        ct.nombre AS centro_trabajo, 
        sc.nombre AS subcentro_trabajo 
        FROM incidente i 
        JOIN catalogo_incidentes ci ON i.id_catalogoincidentes = ci.id_catincidentes
        JOIN centro_trabajo ct ON i.id_centrotrabajo = ct.id_centrotrabajo
        JOIN subcentro_trabajo sc ON i.id_subcentro = sc.id_subcentro
        ORDER BY 
        i.fecha_reporte DESC`);
    return result.rows;
};

export const getIncidenteIdService = async (id) =>  {
    const result = await pool.query('SELECT * FROM incidente WHERE id_incidente = $1', [id]);
    return result.rows[0];
};


export const postIncidenteService = async (id_catalogoincidentes,id_centrotrabajo, id_subcentro) =>  {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(`
            INSERT INTO incidente (
            id_catalogoincidentes, 
            id_centrotrabajo, 
            id_subcentro) 
            VALUES ($1, $2, $3) RETURNING *`, [id_catalogoincidentes, id_centrotrabajo, id_subcentro]);
        
        await client.query('COMMIT');
        return result.rows;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
};



export const actualizarIncidenteService = async (id, estado) =>  {
    const result = await pool.query('UPDATE incidente SET estado = $1 WHERE id=$2 RETURNING *',[id, estado]);
        return result.rows[0];
};


export const getTiposIncidentesService = async () => {
    const result = await pool.query(`SELECT
        id_catincidentes,
        tipo
        FROM
        catalogo_incidentes;
    `);
    return result.rows;
};