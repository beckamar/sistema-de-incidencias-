import express from "express";
import { getEmpleadoId, getEmpleados } from "../controllers/empleadoController.js";

const router = express.Router();


router.get("/empleados", getEmpleados);
router.get("/empleados/:id", getEmpleadoId);


export default router;