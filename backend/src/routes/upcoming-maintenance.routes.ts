import { Router } from 'express';
import { upcomingMaintenanceController } from '../controllers/upcoming-maintenance.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', upcomingMaintenanceController.listByVehicle.bind(upcomingMaintenanceController));
router.post('/', upcomingMaintenanceController.create.bind(upcomingMaintenanceController));
router.get('/:id', upcomingMaintenanceController.getById.bind(upcomingMaintenanceController));
router.put('/:id', upcomingMaintenanceController.update.bind(upcomingMaintenanceController));
router.delete('/:id', upcomingMaintenanceController.delete.bind(upcomingMaintenanceController));

export default router;
