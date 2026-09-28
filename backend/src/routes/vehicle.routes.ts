import { Router } from 'express';
import { vehicleController } from '../controllers/vehicle.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import maintenanceRoutes from './maintenance.routes.js';

const router = Router();

router.use(authMiddleware);

import upcomingMaintenanceRoutes from './upcoming-maintenance.routes.js';
import { dashboardController } from '../controllers/dashboard.controller.js';

router.use('/:vehicleId/maintenances', maintenanceRoutes);
router.use('/:vehicleId/upcoming-maintenances', upcomingMaintenanceRoutes);

router.get('/:vehicleId/summary', dashboardController.getSummary.bind(dashboardController));

router.get('/', vehicleController.list.bind(vehicleController));
router.post('/', vehicleController.create.bind(vehicleController));
router.get('/:id', vehicleController.getById.bind(vehicleController));
router.put('/:id', vehicleController.update.bind(vehicleController));
router.delete('/:id', vehicleController.delete.bind(vehicleController));

export default router;
