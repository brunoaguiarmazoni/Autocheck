import { z } from 'zod';

export const createMaintenanceSchema = z.object({
  date: z.string().datetime(),
  type: z.string().min(1),
  cost: z.number().min(0),
  description: z.string().optional(),
});

export const updateMaintenanceSchema = z.object({
  date: z.string().datetime().optional(),
  type: z.string().min(1).optional(),
  cost: z.number().min(0).optional(),
  description: z.string().optional(),
});

export type CreateMaintenanceDTO = z.infer<typeof createMaintenanceSchema>;
export type UpdateMaintenanceDTO = z.infer<typeof updateMaintenanceSchema>;
