import pool from "../database/db.js";


export const getIncidentesService = async ({ id_estado, id_centrotrabajo, id_subcentro }) => {
    const query = `
    WITH incidentes_filtrados AS (
        SELECT 
            i.id_incidente, 
            ci.tipo AS tipo_incidente, 
            sc.id AS id_subcentro,
            sc.nombre AS subcentro, 
            TO_CHAR(i.fecha_reporte, 'YYYY-MM-DD') AS fecha_reporte,
            TO_CHAR(i.hora_reporte, 'HH24:MI') AS hora_reporte, 
            ct.id AS id_centrotrabajo,
            ct.nombre AS centro_trabajo, 
            ce.id AS id_estado, 
            ce.nombre AS estado_incidente,
            COALESCE(ca.tipo, io.tipo, cv.nombre) AS subtipo, 
            COALESCE(ia.descripcion, io.descripcion, ive.descripcion) AS detalles, 
            CASE 
                WHEN ia.id_ausencia IS NOT NULL THEN e.nombre_completo 
                WHEN ive.id IS NOT NULL THEN ive.clave
                ELSE NULL 
            END AS afectado,
            ROW_NUMBER() OVER (
                PARTITION BY ce.nombre 
                ORDER BY i.fecha_reporte DESC, i.hora_reporte DESC
            ) AS rn
        FROM incidente i 
        JOIN catalogo_incidentes ci ON i.id_catalogoincidentes = ci.id_catincidentes 
        LEFT JOIN subcentro_trabajo sc ON i.id_subcentro = sc.id 
        JOIN centro_trabajo ct ON i.id_centrotrabajo = ct.id 
        LEFT JOIN incidente_ausencia ia ON i.id_incidente = ia.id_incidente 
        LEFT JOIN empleado e ON ia.id_empleado = e.id_empleado 
        LEFT JOIN catalogo_ausencias ca ON ia.id_catausencias = ca.id_ausencia 
        LEFT JOIN incidente_otro io ON i.id_incidente = io.id_incidente
        LEFT JOIN incidente_vehiculoeh ive ON i.id_incidente = ive.id_incidente
        LEFT JOIN categorias_vehiculoeh cv ON ive.id_categoria = cv.id
        JOIN catalogo_estados ce ON i.id_estado = ce.id
        WHERE 
            ($1::int IS NULL OR ce.id = $1)
            AND ($2::int IS NULL OR i.id_centrotrabajo = $2)
            AND ($3::int IS NULL OR i.id_subcentro = $3)
    )
    SELECT *
    FROM incidentes_filtrados
    WHERE 
        estado_incidente != 'Resuelto' OR rn <= 50
    ORDER BY 
        CASE 
            WHEN estado_incidente = 'Pendiente' THEN 1
            WHEN estado_incidente = 'En Proceso' THEN 2
            WHEN estado_incidente = 'Resuelto' THEN 3
        END,
        fecha_reporte ASC,
        hora_reporte ASC;
    `;

    const values = [
        id_estado ? Number(id_estado) : null,
        id_centrotrabajo ? Number(id_centrotrabajo) : null,
        id_subcentro ? Number(id_subcentro) : null,
    ];

    const result = await pool.query(query, values);
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



export const putStatusIncidenteService = async (id_incidente, id_estado) =>  {
     const result = await pool.query('UPDATE incidente SET id_estado = $1 WHERE id_incidente=$2 RETURNING *',[id_estado, id_incidente]);
    return result.rows[0];
};


export const getStatusServices = async () => {
    const result = await pool.query('SELECT id, nombre FROM catalogo_estados;')
    return result.rows;
}


export const getTiposIncidentesService = async () => {
    const result = await pool.query(`SELECT
        id_catincidentes,
        tipo
        FROM
        catalogo_incidentes 
        ORDER BY id_catincidentes;
    `);
    return result.rows;
};