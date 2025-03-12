
import { incidenteStrategy } from "../incidenteStrategy.js";
import pool from "../../config/db.js";

export class ausenciapersonal_Strategy extends incidenteStrategy{

    async crearIncidenteEspecifico(datosEspecificos){
         const {id_incidente,id_empleado, id_tipoausencia, descripcion } = datosEspecificos;
         const query = `iNSERT INTO incidente_ausencia (id_incidente, id_empleado, id_catausencias, descripcion) VALUES ($1, $2, $3, $4) RETURNING *`;
         const result = await pool.query(query, [id_incidente, id_empleado, id_tipoausencia, descripcion]);
         return result.rows[0];
    }

}