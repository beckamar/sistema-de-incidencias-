import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import Login from "./pages/Auth/Login";
import Reporte from './pages/Reporte';
import Admin from './pages/Admin';

     
function App() {
  return (

    <div>
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/admin' exact element={<Admin/>}/>
          <Route path='/reporte' exact element={<Reporte/>}/>
        </Routes> 
      </Router>

    </div>
  )
}

export default App
