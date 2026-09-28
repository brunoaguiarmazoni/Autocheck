"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_controller_js_1 = require("../controllers/vehicle.controller.js");
const authMiddleware_js_1 = require("../middlewares/authMiddleware.js");
const maintenance_routes_js_1 = __importDefault(require("./maintenance.routes.js"));
const router = (0, express_1.Router)();
router.use(authMiddleware_js_1.authMiddleware);
router.use('/:vehicleId/maintenances', maintenance_routes_js_1.default);
router.get('/', vehicle_controller_js_1.vehicleController.list.bind(vehicle_controller_js_1.vehicleController));
router.post('/', vehicle_controller_js_1.vehicleController.create.bind(vehicle_controller_js_1.vehicleController));
router.get('/:id', vehicle_controller_js_1.vehicleController.getById.bind(vehicle_controller_js_1.vehicleController));
router.put('/:id', vehicle_controller_js_1.vehicleController.update.bind(vehicle_controller_js_1.vehicleController));
router.delete('/:id', vehicle_controller_js_1.vehicleController.delete.bind(vehicle_controller_js_1.vehicleController));
exports.default = router;
