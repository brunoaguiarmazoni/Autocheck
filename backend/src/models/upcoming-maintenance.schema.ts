import { z } from 'zod';

export const createUpcomingMaintenanceSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
  targetDate: z.string().datetime().optional(),
  targetMileage: z.number().int().min(0).optional(),
}).refine(data => data.targetDate || data.targetMileage !== undefined, {
  message: "É necessário informar uma data alvo ou uma quilometragem alvo.",
  path: ["targetDate"],
});

export const updateUpcomingMaintenanceSchema = z.object({
  description: z.string().min(1).optional(),
  targetDate: z.string().datetime().optional().nullable(),
  targetMileage: z.number().int().min(0).optional().nullable(),
});

export type CreateUpcomingMaintenanceDTO = z.infer<typeof createUpcomingMaintenanceSchema>;
export type UpdateUpcomingMaintenanceDTO = z.infer<typeof updateUpcomingMaintenanceSchema>;
