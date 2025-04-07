import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import errorHandling from "./src/middlewares/errorHandler.js";
import v1Router from "./src/v1/v1Routes.js";


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api/v1", v1Router); 

app.use(errorHandling);

app.listen(PORT, () =>{
    console.log(`Server  is running on http://localhost:${PORT}`);
});



  

