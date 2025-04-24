import NotificationService from "../../services/firebase/NotificationService.js";

const sendFirebaseNotification = async (req, res) => {
    try {
        const {title, body, deviceToken} = req.body;
        await NotificationService.sendNotification(deviceToken, title, body);
        res.status(200).json({message: "Notification sent successfully ", success:true});

    } catch (error) {
        res.status(500).json({message: "Error sending notification, ", success:false});
    }
}

export default sendFirebaseNotification;