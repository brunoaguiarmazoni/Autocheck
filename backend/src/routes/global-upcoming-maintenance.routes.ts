import { Router } from 'express';
import { upcomingMaintenanceController } from '../controllers/upcoming-maintenance.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', upcomingMaintenanceController.listByUser.bind(upcomingMaintenanceController));

export default router;
