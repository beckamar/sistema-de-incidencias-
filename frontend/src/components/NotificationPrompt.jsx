import React, { useState, useEffect } from 'react';
import { requestPermission, setupOnMessageListener } from '../utils/firebaseUtils';

const NotificationPrompt = ({ onPermissionGranted }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Comprobar si ya se ha tomado una decisión
    const userChoice = localStorage.getItem('notificationChoice');
    
    // Si el usuario ya ha tomado una decisión, no mostrar el cuadro
    if (userChoice) {
      setShowPrompt(false);
    } else if (Notification.permission === 'default') {
      setShowPrompt(true); // Mostrar cuadro solo si es 'default'
    } else {
      setShowPrompt(false);
    }
  }, []);

  const handleEnableNotifications = async () => {
    try {
      const token = await requestPermission();
      if (token) {
        setupOnMessageListener();
        onPermissionGranted?.(token);
        setShowPrompt(false); // Ocultar cuadro cuando el permiso sea otorgado
        localStorage.setItem('notificationChoice', 'yes'); // Guardar la elección
      }
    } catch (err) {
      console.error("Error solicitando notificaciones:", err);
    }
  };

  const handleDecline = () => {
    setShowPrompt(false); // Ocultar cuadro cuando se rechace
    localStorage.setItem('notificationChoice', 'no'); // Guardar la elección
  };

  // Si el componente no necesita mostrarse, retorna null
  if (!showPrompt) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(10px)',
      padding: '10px 14px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      zIndex: 1000,
      maxWidth: '320px',
      width: 'calc(100% - 32px)', // siempre deja márgenes en móviles
      fontSize: '12px',
      textAlign: 'center',
    }}>
      <span style={{ color: '#333', marginBottom: '8px', display: 'block' }}>
        ¿Deseas recibir notificaciones de nuevos reportes?
      </span>
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginTop: '4px',
      }}>
        <button
          onClick={handleEnableNotifications}
          style={{
            background: '#1976d2',
            color: 'white',
            padding: '6px 10px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          Sí
        </button>
        <button
          onClick={handleDecline}
          style={{
            background: '#f0f0f0',
            color: '#333',
            padding: '6px 10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default NotificationPrompt;
