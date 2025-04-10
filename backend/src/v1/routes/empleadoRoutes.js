import express from "express";
import { getEmpleados, postEmpleado } from "../../controllers/empleadoController.js";

const router = express.Router();


router
    .get("/", getEmpleados)
    .post("/", postEmpleado);


export default router;