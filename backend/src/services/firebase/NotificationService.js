import admin from "../../utils/firebaseUtils.js";

class NotificationService {
    static async sendNotification(title, body){
        const message = {
            topic: "incidentes",
            notification: {
                title: "Nuevo Reporte",
                body
            },
            webpush: {
                fcm_options: {
                    link: "https://" 
                }
            }
        };
        console.log("Mensaje a enviar:", message);
        try {
            const response = await admin.messaging().send(message);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default NotificationService;