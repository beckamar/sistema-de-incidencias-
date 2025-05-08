import express from "express";
import { getCategoriasVehiculoEH, postReporteVehiculoEH } from "../../controllers/vehiculoEHController.js";

const router = express.Router();

router
    .get("/categorias", getCategoriasVehiculoEH )
    .post("/", postReporteVehiculoEH);


export default router;