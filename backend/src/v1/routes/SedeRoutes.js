import express from "express";
import { getIdCentroTrabajo } from "../../controllers/sede/centroController.js";
import { getIdSubcentros } from "../../controllers/sede/subcentroController.js";

const router = express.Router();

router
    .get("/:id_rol/centros", getIdCentroTrabajo)
    .get("/:id_centro/subcentros", getIdSubcentros);
    

export default router;