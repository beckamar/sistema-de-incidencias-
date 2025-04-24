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
const vapidKey = "BCVK1t3nJogc3yf9YOhSEQc2fUev4FVcos1b-Ucwc7kRjKoUWOPPNwvWFMz8SH70AidwNX1B4RaY1XUCVx0CBoQ";


export const requestFCMToken = async () => {
    return Notification.requestPermission()
    .then((permission) => {
        if(permission === "granted"){
            return getToken(messaging, {vapidKey})
        }else{
            throw new Error("Notification not granted");

        }
    })
    .catch((err) => {
        console.error("Error getting FCM token: ", err);
        throw err;
    })
}


export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        })
    })
}