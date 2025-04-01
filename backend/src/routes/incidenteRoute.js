import express from "express";
import { actualizarIncidente, getIncidentes, getTiposIncidentes, postIncidente } from "../controllers/incidenteController.js";

const router = express.Router();


router.get("/incidentes", getIncidentes);
router.post("/incidente/crear", postIncidente);
router.get("/incidente/:id/actualizar", actualizarIncidente);
router.get("/incidente/tipos", getTiposIncidentes);

export default router;