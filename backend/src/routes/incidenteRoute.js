import express from "express";
import { actualizarIncidente, crearIncidente, getIncidentes, getTiposIncidentes } from "../controllers/incidenteController.js";

const router = express.Router();


router.get("/incidentes", getIncidentes);
router.post("/incidente/crear", crearIncidente);
router.get("/incidente/:id/actualizar", actualizarIncidente);
router.get("/incidente/tipos", getTiposIncidentes);

export default router;