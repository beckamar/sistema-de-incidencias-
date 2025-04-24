import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect }  from 'react'
import Login from "./pages/auth/Login";
import Superintendente from './pages/admin/Superintendente';
import TipoIncidente from './pages/reporte/TipoIncidente';
import AusenciaPersonal from './pages/reporte/AusenciaPersonal';
import EquipoTrabajo from './pages/reporte/EquipoTrabajo';
import Otro from  './pages/reporte/Otro';
import { requestFCMToken, onMessageListener } from './utils/firebaseUtils';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
     
function App() {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const fetchFCMToken = async() => {
      try {
        const token =  await requestFCMToken();
        setFcmToken(token);
        console.log(token);
      } catch (error) {
        console.error("Error getting FCM token ", err);
      }
    }
    fetchFCMToken()
  }, []);

  onMessageListener().then(payload => {
    toast(
      <div>
        <strong>{payload.notification.title}</strong>
        <div>{payload.notification.body}</div>
      </div>,
      {position: "top-right"}
    );
    console.log("Foreground message", payload);
  }).catch(err=>console.error("error: ", err));


  return (

    <div>
      <ToastContainer />      
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
