import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {

    apiKey: "AIzaSyB6fKCra4zldnRWTOdLslikIqDX81qON2k",
  
    authDomain: "pushnotifications-incidencias.firebaseapp.com",
  
    projectId: "pushnotifications-incidencias",
  
    storageBucket: "pushnotifications-incidencias.firebasestorage.app",
  
    messagingSenderId: "1009943894190",
  
    appId: "1:1009943894190:web:8d9777fdbce69a7be3b53f",
  
    measurementId: "G-5TFWE9YNK3"
  
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);


/**
 * Solicita permiso al usuario para recibir notificaciones y obtiene el token de FCM.
 * @returns {Promise<string | null>} Token de FCM o null si no se pudo obtener.
 */
export async function requestPermission() {
  console.log("Requesting permission...");

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const vapidKey = "BCVK1t3nJogc3yf9YOhSEQc2fUev4FVcos1b-Ucwc7kRjKoUWOPPNwvWFMz8SH70AidwNX1B4RaY1XUCVx0CBoQ";
      const currentToken = await getToken(messaging, { vapidKey });
      if (currentToken) {
        console.log("FCM Token:", currentToken);
        return currentToken;
      } else {
        console.warn(
          "No registration token available. Request permission to generate one."
        );
        return null;
      }
    } else {
      console.warn("Permission not granted for notifications.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
    throw error;
  }
}

export function setupOnMessageListener() {
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    alert(
      `Nueva notificación: ${payload.notification?.title} - ${payload.notification?.body}`
    );
  });
}