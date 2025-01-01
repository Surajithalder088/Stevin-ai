import express from "express";
const router=express.Router()
import * as messageController from "../controllers/message.controllers.js"
import  * as authMiddleware from '../middleware/auth.middleware.js';


router.get("/get-messages/:projectId",messageController.getMessages)
router.post("/post-message",authMiddleware.authuser,messageController.postMessage)


export default router;