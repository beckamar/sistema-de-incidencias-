import express from "express";
import { postOtroTpoIncidente } from "../../controllers/otroTipoIncidenteController.js";

const router = express.Router();

router
    .post("/", postOtroTpoIncidente);


export default router;