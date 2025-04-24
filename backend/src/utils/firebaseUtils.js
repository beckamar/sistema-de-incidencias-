import admin from "firebase-admin";
import serviceAccount from "./firebaseAdminSDK.json" with { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;