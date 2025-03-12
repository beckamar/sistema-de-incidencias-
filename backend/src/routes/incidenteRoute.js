import express from "express";
import { actualizarIncidente, crearIncidente, getIncidenteId, getIncidentes } from "../controllers/incidenteController.js";

const router = express.Router();


router.get("/incidentes", getIncidentes);
router.get("/incidente/:id", getIncidenteId);
router.post("/incidente/crear", crearIncidente);
router.get("/incidente/:id/actualizar", actualizarIncidente);

export default router;