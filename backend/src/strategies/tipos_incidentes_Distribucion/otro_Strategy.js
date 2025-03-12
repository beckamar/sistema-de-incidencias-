import { incidenteStrategy } from "../incidenteStrategy.js";
import pool from "../../config/db.js";

export class otro_Strategy {

    async crearIncidenteEspecifico(datosEspecificos){
        const {id_incidente, tipo, descripcion} = datosEspecificos;
        const query = `INSERT INTO incidente_otro (id_incidente, tipo, descripcion) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [id_incidente, tipo, descripcion]);
        return result.rows[0];
    }
}