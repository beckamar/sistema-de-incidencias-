import express from "express";
import { getEmpleados, postEmpleado, postClave } from "../../controllers/empleadoController.js";

const router = express.Router();


router
    .get("/", getEmpleados)
    .post("/", postEmpleado)
    .post("/rpe", postClave);


export default router;