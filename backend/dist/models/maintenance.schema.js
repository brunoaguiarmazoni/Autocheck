"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMaintenanceSchema = exports.createMaintenanceSchema = void 0;
const zod_1 = require("zod");
exports.createMaintenanceSchema = zod_1.z.object({
    date: zod_1.z.string().datetime(),
    type: zod_1.z.string().min(1),
    cost: zod_1.z.number().min(0),
    description: zod_1.z.string().optional(),
});
exports.updateMaintenanceSchema = zod_1.z.object({
    date: zod_1.z.string().datetime().optional(),
    type: zod_1.z.string().min(1).optional(),
    cost: zod_1.z.number().min(0).optional(),
    description: zod_1.z.string().optional(),
});
