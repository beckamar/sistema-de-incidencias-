import express from "express";
const router = express.Router();
import { sendFirebaseNotification,subscribeToTopic } from "../controllers/firebase/FirebaseController.js";

router.post("/send-notification", async(req, res) =>{
    const result = await sendFirebaseNotification(req, res);
    return result;
} );

router.post("/subscribeToTopic", async(req, res) =>{
    const result = await subscribeToTopic(req, res);
    return result;
} );

export default router;