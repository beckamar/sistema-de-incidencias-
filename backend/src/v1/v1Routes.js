import {Router} from 'express'
import empleadosRoutes from "./routes/empleadoRoutes.js";
import incidentesRoutes from "./routes/incidenteRoute.js";
import loginRoutes from "./routes/loginRoutes.js";
import sedeRoute from "./routes/SedeRoutes.js";
import ausenciaPersonalRoutes from "./routes/ausenciaPersonalRoutes.js";
import rolRoutes from "./routes/rolRoute.js";
import otroTipoIncideteRoutes from "./routes/otroTipoIncidenteRoutes.js";


const router = Router();

router.use("/roles", rolRoutes);
router.use("/sedes", sedeRoute);
router.use("/empleados", empleadosRoutes);
router.use("/ausenciapersonal", ausenciaPersonalRoutes);
router.use("/otrotipo", otroTipoIncideteRoutes);
router.use("/incidentes", incidentesRoutes);
router.use("/login", loginRoutes);



export default router;