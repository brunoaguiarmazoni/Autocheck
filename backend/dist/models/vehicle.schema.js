"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicleSchema = exports.createVehicleSchema = void 0;
const zod_1 = require("zod");
exports.createVehicleSchema = zod_1.z.object({
    brand: zod_1.z.string().min(1, 'A marca é obrigatória'),
    model: zod_1.z.string().min(1, 'O modelo é obrigatório'),
    year: zod_1.z.number().int().min(1886, 'Ano inválido').max(new Date().getFullYear() + 1, 'Ano inválido'),
    licensePlate: zod_1.z.string().min(1, 'A placa é obrigatória'),
    currentMileage: zod_1.z.number().int().min(0, 'A quilometragem não pode ser negativa'),
});
exports.updateVehicleSchema = zod_1.z.object({
    brand: zod_1.z.string().min(1, 'A marca é obrigatória').optional(),
    model: zod_1.z.string().min(1, 'O modelo é obrigatório').optional(),
    year: zod_1.z.number().int().min(1886, 'Ano inválido').max(new Date().getFullYear() + 1, 'Ano inválido').optional(),
    licensePlate: zod_1.z.string().min(1, 'A placa é obrigatória').optional(),
    currentMileage: zod_1.z.number().int().min(0, 'A quilometragem não pode ser negativa').optional(),
});
