import { Router } from 'express';
import { maintenanceController } from '../controllers/maintenance.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', maintenanceController.listByVehicle.bind(maintenanceController));
router.post('/', maintenanceController.create.bind(maintenanceController));
router.get('/:id', maintenanceController.getById.bind(maintenanceController));
router.put('/:id', maintenanceController.update.bind(maintenanceController));
router.delete('/:id', maintenanceController.delete.bind(maintenanceController));

export default router;
