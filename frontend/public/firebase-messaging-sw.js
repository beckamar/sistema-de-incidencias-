import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyB6fKCra4zldnRWTOdLslikIqDX81qON2k",
  authDomain: "pushnotifications-incidencias.firebaseapp.com",
  projectId: "pushnotifications-incidencias",
  storageBucket: "pushnotifications-incidencias.firebasestorage.app",
  messagingSenderId: "1009943894190",
  appId: "1:1009943894190:web:8d9777fdbce69a7be3b53f",
  measurementId: "G-5TFWE9YNK3",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification?.title || "Nuevo Reporte";
  const notificationOptions = {
    body: payload.notification?.body || "Tienes un nuevo mensaje.",
    //icon: "/firebase-logo.png", 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


