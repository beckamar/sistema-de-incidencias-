import axiosInstance from "./axiosInstance";
import { messaging } from "../utils/firebaseUtils.js";
import { onMessage, getToken } from "firebase/messaging";
import { toast } from 'react-toastify';

const vapidKey = "BCVK1t3nJogc3yf9YOhSEQc2fUev4FVcos1b-Ucwc7kRjKoUWOPPNwvWFMz8SH70AidwNX1B4RaY1XUCVx0CBoQ";


export async function fetchFCMToken(setFcmToken) {
  try {
    const currentToken = await getToken(messaging, { vapidKey });
    if (currentToken) {
      console.log("Token FCM obtenido:", currentToken);
      setFcmToken(currentToken);
      return currentToken;
    } else {
      console.log('No se obtuvo token. Solicita permisos para notificaciones.');
    }
  } catch (error) {
    console.error('Error obteniendo el token FCM:', error);
  }
};



export const subscribeToTopic = async (token) => {
  try {
    const response = await axiosInstance.post("/api/firebase/subscribeToTopic", { token });
    console.log("Suscripción al tópico exitosa:", response.data);
  } catch (error) {
    console.error("Error al suscribirse al topic:", error);
  }
};


onMessage(messaging, (payload) => {
  console.log('Mensaje recibido en foreground:', payload);
  toast.info(`${payload.notification.title}: ${payload.notification.body}`, {
    position: "top-right",
    autoClose: 5000
  });
});


  
