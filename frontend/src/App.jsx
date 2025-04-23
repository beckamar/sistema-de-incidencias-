import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import Login from "./pages/auth/Login";
import Superintendente from './pages/admin/Superintendente';
import TipoIncidente from './pages/reporte/TipoIncidente';
import AusenciaPersonal from './pages/reporte/AusenciaPersonal';
import EquipoTrabajo from './pages/reporte/EquipoTrabajo';
import Otro from  './pages/reporte/Otro';

     
function App() {
  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route path='/admin' element={<Superintendente/>}/>
          <Route path='/tipoincidente' element={<TipoIncidente/>}/>
          <Route path='/ausenciapersonal' element={<AusenciaPersonal/>}/>
          <Route path='/equipotrabajo' element={<EquipoTrabajo/>}/>
          <Route path='/otro' element={<Otro/>}/>
          <Route path='*' element={<h1>404 - Página no encontrada</h1>}/>
        </Routes> 
      </Router>

    </div>
  )
}

export default App
