import { Router } from 'express';
import { vehicleController } from '../controllers/vehicle.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', vehicleController.list.bind(vehicleController));
router.post('/', vehicleController.create.bind(vehicleController));
router.get('/:id', vehicleController.getById.bind(vehicleController));
router.put('/:id', vehicleController.update.bind(vehicleController));
router.delete('/:id', vehicleController.delete.bind(vehicleController));

export default router;
