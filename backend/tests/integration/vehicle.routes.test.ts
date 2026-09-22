import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import { vehicleService } from '../../src/services/vehicle.service.js';
import { authService } from '../../src/services/auth.service.js';

describe('Vehicle Routes (Integration Tests)', () => {
  const mockToken = authService.generateToken({ userId: 'user-123', email: 'user@example.com' });
  const otherToken = authService.generateToken({ userId: 'other-user', email: 'other@example.com' });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/v1/vehicles', () => {
    it('should return a list of vehicles for the authenticated user (Happy Path)', async () => {
      vi.spyOn(vehicleService, 'listByUser').mockResolvedValue([
        {
          id: 'vehicle-1',
          userId: 'user-123',
          brand: 'Toyota',
          model: 'Corolla',
          year: 2020,
          licensePlate: 'ABC-1234',
          currentMileage: 50000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      const res = await request(app)
        .get('/api/v1/vehicles')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].brand).toBe('Toyota');
    });

    it('should deny access if not authenticated (Sad Path)', async () => {
      const res = await request(app).get('/api/v1/vehicles');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/v1/vehicles/:id', () => {
    it('should return a vehicle by id (Happy Path)', async () => {
      vi.spyOn(vehicleService, 'getById').mockResolvedValue({
        id: 'vehicle-1',
        userId: 'user-123',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        licensePlate: 'ABC-1234',
        currentMileage: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .get('/api/v1/vehicles/vehicle-1')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe('vehicle-1');
    });

    it('should return 404 if vehicle not found (Sad Path)', async () => {
      vi.spyOn(vehicleService, 'getById').mockRejectedValue(new Error('VEHICLE_NOT_FOUND'));

      const res = await request(app)
        .get('/api/v1/vehicles/invalid-id')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(404);
      expect(res.body.title).toBe('Não encontrado');
    });

    it('should return 403 if vehicle belongs to another user (Edge Case)', async () => {
      vi.spyOn(vehicleService, 'getById').mockRejectedValue(new Error('FORBIDDEN_ACCESS'));

      const res = await request(app)
        .get('/api/v1/vehicles/vehicle-1')
        .set('Authorization', `Bearer ${otherToken}`);

      expect(res.status).toBe(403);
      expect(res.body.title).toBe('Acesso negado');
    });
  });

  describe('POST /api/v1/vehicles', () => {
    it('should create a vehicle and return 201 (Happy Path)', async () => {
      vi.spyOn(vehicleService, 'create').mockResolvedValue({
        id: 'vehicle-1',
        userId: 'user-123',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        licensePlate: 'ABC-1234',
        currentMileage: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .post('/api/v1/vehicles')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          brand: 'Toyota',
          model: 'Corolla',
          year: 2020,
          licensePlate: 'ABC-1234',
          currentMileage: 50000,
        });

      expect(res.status).toBe(201);
      expect(res.body.id).toBe('vehicle-1');
    });

    it('should return 400 for invalid payload (Sad Path)', async () => {
      const res = await request(app)
        .post('/api/v1/vehicles')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          brand: '', // invalid
          model: 'Corolla',
          year: 3000, // invalid
          licensePlate: 'ABC-1234',
          currentMileage: -10, // invalid
        });

      expect(res.status).toBe(400);
      expect(res.body.title).toBe('Erro de validação');
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('PUT /api/v1/vehicles/:id', () => {
    it('should update a vehicle and return 200 (Happy Path)', async () => {
      vi.spyOn(vehicleService, 'update').mockResolvedValue({
        id: 'vehicle-1',
        userId: 'user-123',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        licensePlate: 'ABC-1234',
        currentMileage: 60000, // updated
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .put('/api/v1/vehicles/vehicle-1')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          currentMileage: 60000,
        });

      expect(res.status).toBe(200);
      expect(res.body.currentMileage).toBe(60000);
    });
  });

  describe('DELETE /api/v1/vehicles/:id', () => {
    it('should delete a vehicle and return 204 (Happy Path)', async () => {
      vi.spyOn(vehicleService, 'delete').mockResolvedValue({
        id: 'vehicle-1',
        userId: 'user-123',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        licensePlate: 'ABC-1234',
        currentMileage: 60000,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const res = await request(app)
        .delete('/api/v1/vehicles/vehicle-1')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(204);
    });

    it('should return 403 when trying to delete another users vehicle (Edge Case)', async () => {
      vi.spyOn(vehicleService, 'delete').mockRejectedValue(new Error('FORBIDDEN_ACCESS'));

      const res = await request(app)
        .delete('/api/v1/vehicles/vehicle-1')
        .set('Authorization', `Bearer ${otherToken}`);

      expect(res.status).toBe(403);
    });
  });
});
