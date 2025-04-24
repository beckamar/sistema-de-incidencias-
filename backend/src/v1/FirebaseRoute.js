import express from "express";
import sendFirebaseNotification from "../controllers/firebase/FirebaseController.js";

const router = express.Router();
router.post("/send-notification", async (req, res) => {
    const result = await sendFirebaseNotification(req, res);
    return res.send(result);
})

export default router;