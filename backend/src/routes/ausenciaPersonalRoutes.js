import express from "express";
import { getTiposAusenciaPersonal } from "../controllers/ausenciaPersonalController.js";

const router = express.Router();

router.get("/ausencia/tipos", getTiposAusenciaPersonal);


export default router;