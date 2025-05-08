import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import useFirebaseNotifications from './hooks/useFirebaseNotifications';
     
function App() {

  useFirebaseNotifications();

  return (

    <div>
      <ToastContainer />      
      <Router>
        <AppRoutes/>
      </Router>
    </div>
  );
}

export default App;
