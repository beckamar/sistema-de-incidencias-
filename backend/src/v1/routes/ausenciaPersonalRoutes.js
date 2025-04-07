import express from "express";
import { getTiposAusenciaPersonal, postReporteAusencia } from "../../controllers/ausenciaPersonalController.js";

const router = express.Router();

router
    .get("/tipos", getTiposAusenciaPersonal)
    .post("/", postReporteAusencia);


export default router;