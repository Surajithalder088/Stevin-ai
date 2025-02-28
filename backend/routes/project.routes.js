import {Router} from 'express';
import * as projectController from '../controllers/project.controller.js';
import  * as authMiddleware from '../middleware/auth.middleware.js';

const router =Router();

router.post('/create',authMiddleware.authuser,projectController.createProjectController);

router.get('/all',authMiddleware.authuser,projectController.getProjectsController);
router.put("/add-user",authMiddleware.authuser,projectController.addUserController);
router.get("/get-project/:projectid",authMiddleware.authuser,projectController.getProjectByIdController);
router.delete("/delete-project/:projectid",authMiddleware.authuser,projectController.deleteproject);

export default router;