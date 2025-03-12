import express from "express";

const router = express.Router();

//superinendete
router.get("/gestionIncidentes", (req, res) =>{
    res.json({message: "Gestion de incidentes"});
});

//jefe zona/agencia, request del centro
router.get("/gestionIncidentes/id:", (req, res) =>{
    res.json({message: "Gestion de incidentes del centro de trabajo: "});
});

//Empleado
router.post("/crearincidente", (req, res) =>{
    res.json({message: "Crear incidente"});
});


export default router;