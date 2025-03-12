import express from "express";
import { getRol, getCentroTrabajo, getSubcentro } from "../controllers/SedeController.js";

const router = express.Router();

router.get("/authRout/rol", getRol);
router.get("/sedeRout/centrotrabajo", getCentroTrabajo);
router.get("/sedeRout/subcentro", getSubcentro);

export default router;