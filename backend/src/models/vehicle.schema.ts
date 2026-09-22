import { z } from 'zod';

export const createVehicleSchema = z.object({
  brand: z.string().min(1, 'A marca é obrigatória'),
  model: z.string().min(1, 'O modelo é obrigatório'),
  year: z.number().int().min(1886, 'Ano inválido').max(new Date().getFullYear() + 1, 'Ano inválido'),
  licensePlate: z.string().min(1, 'A placa é obrigatória'),
  currentMileage: z.number().int().min(0, 'A quilometragem não pode ser negativa'),
});

export const updateVehicleSchema = z.object({
  brand: z.string().min(1, 'A marca é obrigatória').optional(),
  model: z.string().min(1, 'O modelo é obrigatório').optional(),
  year: z.number().int().min(1886, 'Ano inválido').max(new Date().getFullYear() + 1, 'Ano inválido').optional(),
  licensePlate: z.string().min(1, 'A placa é obrigatória').optional(),
  currentMileage: z.number().int().min(0, 'A quilometragem não pode ser negativa').optional(),
});

export type CreateVehicleDTO = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleDTO = z.infer<typeof updateVehicleSchema>;
