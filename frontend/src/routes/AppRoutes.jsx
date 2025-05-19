import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "../pages/auth/Login";
import TipoIncidente from '../pages/reporte/TipoIncidente';
import AusenciaPersonal from '../pages/reporte/AusenciaPersonal';
import VehiculoEH from '../pages/reporte/VehiculoEH';
import Otro from  '../pages/reporte/Otro';
import NotFoundPage from '../pages/NotFoundPage';
import Dashboard from '../pages/admin/Dashboard';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/tipoincidente' element={<TipoIncidente/>}/>
        <Route path='/ausenciapersonal' element={<AusenciaPersonal/>}/>
        <Route path='/vehiculoeh' element={<VehiculoEH/>}/>
        <Route path='/otro' element={<Otro/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
    </Routes> 
);

export default AppRoutes;