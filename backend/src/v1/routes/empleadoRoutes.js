import express from "express";
import { getEmpleadoId, getEmpleados, postEmpleado } from "../../controllers/empleadoController.js";

const router = express.Router();


router
    .get("/", getEmpleados)
    .get("/:id_empleado", getEmpleadoId)
    .post("/", postEmpleado);


export default router;