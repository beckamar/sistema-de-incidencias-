import NotificationService from "../../services/firebase/NotificationService.js";
import handleResponse from "../../middlewares/responseHandler.js";


const sendFirebaseNotification = async(req, res) => {
    try {
        const { title, body, deviceToken } = req.body;
        await NotificationService.sendNotification(deviceToken, title, body);
        handleResponse(res, 200, "Notification sent successfully", {success: true});
    } catch (error) {
        handleResponse(res, 500, "Error sending notification", { error: error.message, success: false});
    }
 }

 export default sendFirebaseNotification;

