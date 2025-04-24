importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js');


const firebaseConfig = {
  apiKey: "AIzaSyB6fKCra4zldnRWTOdLslikIqDX81qON2k",
  authDomain: "pushnotifications-incidencias.firebaseapp.com",
  projectId: "pushnotifications-incidencias",
  storageBucket: "pushnotifications-incidencias.firebasestorage.app",
  messagingSenderId: "1009943894190",
  appId: "1:1009943894190:web:8d9777fdbce69a7be3b53f",
  measurementId: "G-5TFWE9YNK3",
};

firebaseConfig.initializeApp(firebaseConfig);
const messaging = firebaseConfig.messaging();



messaging.onBackgroundMessage(function  (payload) {
  console.log("Received background message  ", payload);
});