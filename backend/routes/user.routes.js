import { Router } from "express";
import * as userController from "../controllers/user.controller.js"
import {body} from 'express-validator'
import * as authMiddleware from "../middleware/auth.middleware.js"
const router=Router();

router.post('/register',
    
    userController.createUserController);

router.post('/login',userController.loginController)

router.get('/profile',authMiddleware.authuser,userController.profileController)

router.get('/logout',authMiddleware.authuser,userController.logoutController)

router.get('/all/:projectid',authMiddleware.authuser,userController.allUsersController)

export default router;