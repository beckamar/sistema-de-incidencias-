import express from "express";
import { getIncidentes, getStatus, getTiposIncidentes, postIncidente, putStatusIncidente } from "../../controllers/incidenteController.js";

const router = express.Router();


router
    .get("/", getIncidentes)
    .get("/tipos", getTiposIncidentes)
    .post("/", postIncidente)
    .put("/:id_incidente", putStatusIncidente)
    .get("/status", getStatus);


export default router;