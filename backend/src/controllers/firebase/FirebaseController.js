import admin from "../../utils/firebaseUtils.js";
import NotificationService from "../../services/firebase/NotificationService.js";
import handleResponse from '../../middlewares/responseHandler.js';

export const sendFirebaseNotification = async (req, res) => {
    try {
        const { title, body } = req.body;
        
        const response = await NotificationService.sendNotification(title, body);
        handleResponse(res, 200, "Notificación enviada exitosamente", response);

    }catch (error) {
        handleResponse(res, 500, "Error al enviar la notificación", { error: error.message});
    }
}


export const subscribeToTopic = async(req, res) => {
    const { token } = req.body;
    try {
        await admin.messaging().subscribeToTopic([token], 'incidentes');
        handleResponse(res, 200, "Token suscrito exitosamente al topic 'incidentes'");
    } catch (error) {
        handleResponse(res, 500, "Error al suscribirse al topic", { error: error.message});
    }
};

export const unsubscribeToTopic = async(req, res) => {
    const { token } = req.body;

    try {
        await admin.messaging().unsubscribeFromTopic([token], 'incidentes');
        handleResponse(res, 200, "Token removido exitosamente del topic 'incidentes'");
    } catch (error) {
        handleResponse(res, 500, "Error al remover token del topic", { error: error.message });
    }

};

