import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import Login from "./pages/Auth/Login";

     
function App() {
  return (

    <div>
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login/>}/>
        </Routes> 
      </Router>

    </div>
  )
}

export default App
