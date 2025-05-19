import express from "express";
import { getCentrosTrabajo, getIdCentroTrabajoRol } from "../../controllers/sede/centroController.js";
import { getIdSubcentros } from "../../controllers/sede/subcentroController.js";

const router = express.Router();

router
    .get("/:id_rol/centros", getIdCentroTrabajoRol)
    .get("/centros", getCentrosTrabajo)
    .get("/:id_centro/subcentros", getIdSubcentros);
    

export default router;