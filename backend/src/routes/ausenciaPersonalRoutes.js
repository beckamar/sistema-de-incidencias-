import express from "express";
import { getTiposAusenciaPersonal, postReporteAusencia } from "../controllers/ausenciaPersonalController.js";

const router = express.Router();

router.get("/ausencia/tipos", getTiposAusenciaPersonal);
router.post("/ausencia/crear", postReporteAusencia);


export default router;