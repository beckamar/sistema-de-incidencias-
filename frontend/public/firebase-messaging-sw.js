importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');


firebase.initializeApp({
  apiKey: "AIzaSyB6fKCra4zldnRWTOdLslikIqDX81qON2k",
  authDomain: "pushnotifications-incidencias.firebaseapp.com",
  projectId: "pushnotifications-incidencias",
  storageBucket: "pushnotifications-incidencias.appspot.com",
  messagingSenderId: "1009943894190",
  appId: "1:1009943894190:web:8d9777fdbce69a7be3b53f",
  measurementId: "G-5TFWE9YNK3",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Recibido mensaje en background ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
    //icon: '/firebase-logo.png' 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});