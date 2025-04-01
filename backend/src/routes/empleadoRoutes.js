import express from "express";
import { getEmpleadoId, getEmpleados, postEmpleado } from "../controllers/empleadoController.js";

const router = express.Router();


router.get("/empleados", getEmpleados);
router.get("/empleados/:id", getEmpleadoId);
router.post("/empleado/crear", postEmpleado);


export default router;