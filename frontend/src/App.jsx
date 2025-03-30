import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import Login from "./pages/auth/Login";
import Admin from './pages/Admin';
import TipoIncidente from './pages/reporte/TipoIncidente';
import AusenciaPersonal from './pages/reporte/AusenciaPersonal';


     
function App() {
  return (

    <div>
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/tipoincidente' exact element={<TipoIncidente/>}/>
          <Route path='/ausenciapersonal' exact element={<AusenciaPersonal/>}/>
          <Route path='/equipotrabajo' exact element={<AusenciaPersonal/>}/>
          <Route path='/otro' exact element={<AusenciaPersonal/>}/>
          <Route path='/admin' exact element={<Admin/>}/>
        </Routes> 
      </Router>

    </div>
  )
}

export default App
