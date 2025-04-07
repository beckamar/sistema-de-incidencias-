import express from "express";
import { getIncidentes, getTiposIncidentes, postIncidente } from "../../controllers/incidenteController.js";

const router = express.Router();


router
    .get("/", getIncidentes)
    .get("/tipos", getTiposIncidentes)
    .post("/", postIncidente);

// .get("/:id_incidentes", actualizarIncidente)

export default router;