import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import errorHandling from "./src/middlewares/errorHandler.js";
import v1Router from "./src/v1/v1Routes.js";
import FirebaseRoute from "./src/v1/FirebaseRoute.js";
import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' with {type: 'json'};
import path from "path";
import { fileURLToPath } from 'url';


const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(express.json());
app.use(cors());

app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use("/v1", v1Router); 
app.use("/firebase", FirebaseRoute);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });

app.use(errorHandling);

app.listen(PORT, () =>{
    console.log(`Server  is running on http://localhost:${PORT}`);
});



  

