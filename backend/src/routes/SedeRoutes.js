import express from "express";
import { getCentroTrabajo, getSubcentro } from "../controllers/SedeController.js";

const router = express.Router();

router.get("/sedeRout/centrotrabajo", getCentroTrabajo);
router.get("/sedeRout/subcentro", getSubcentro);

export default router;