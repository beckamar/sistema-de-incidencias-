import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pool from "./src/config/db.js";
import empleadosRoutes from "./src/routes/empleadoRoutes.js";
import incidentesRoutes from "./src/routes/incidenteRoute.js";
import loginRoutes from "./src/routes/loginRoutes.js";
import errorHandling from "./src/middlewares/errorHandler.js";
import rolRoute from "./src/routes/rolRoute.js"
import sedeRoute from "./src/routes/SedeRoutes.js"

const app = express();
const PORT = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", rolRoute);
app.use("/api", sedeRoute);
app.use("/api", empleadosRoutes);
app.use("/api", incidentesRoutes);
app.use("/api", loginRoutes);


//Error handling Middelware
app.use(errorHandling);

  
//Testing POSTGRE Connection
app.get('/', async(req, res) =>{
    console.log("Start");
    const result = await pool.query("SELECT current_database()");
    console.log("End");
    res.send(`The database name is: ${result.rows[0].current_database}`)
});

//Server running
app.listen(PORT, () =>{
    console.log(`Server  is running on http://localhost:${PORT}`);
});



  

