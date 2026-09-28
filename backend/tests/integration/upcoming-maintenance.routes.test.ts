import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';
import { authService } from '../../src/services/auth.service';

const prisma = new PrismaClient();

describe('Upcoming Maintenance Routes (Integration Tests)', () => {
  let userToken: string;
  let otherUserToken: string;
  let vehicleId: string;
  let otherVehicleId: string;

  beforeAll(async () => {
    await prisma.upcomingMaintenance.deleteMany();
    await prisma.maintenance.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
      data: { name: 'Test User', email: 'test@example.com', password: 'password123' },
    });
    userToken = authService.generateToken({ userId: user.id, email: user.email });

    const otherUser = await prisma.user.create({
      data: { name: 'Other User', email: 'other@example.com', password: 'password123' },
    });
    otherUserToken = authService.generateToken({ userId: otherUser.id, email: otherUser.email });

    const vehicle = await prisma.vehicle.create({
      data: { userId: user.id, brand: 'Toyota', model: 'Corolla', year: 2020, licensePlate: 'ABC-1234', currentMileage: 50000 },
    });
    vehicleId = vehicle.id;

    const otherVehicle = await prisma.vehicle.create({
      data: { userId: otherUser.id, brand: 'Honda', model: 'Civic', year: 2021, licensePlate: 'XYZ-9876', currentMileage: 40000 },
    });
    otherVehicleId = otherVehicle.id;
  });

  afterAll(async () => {
    await prisma.upcomingMaintenance.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.upcomingMaintenance.deleteMany();
  });

  describe('POST /api/v1/vehicles/:vehicleId/upcoming-maintenances', () => {
    it('should create an upcoming maintenance', async () => {
      const response = await request(app)
        .post(`/api/v1/vehicles/${vehicleId}/upcoming-maintenances`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          description: 'Troca de óleo',
          targetMileage: 60000,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.description).toBe('Troca de óleo');
      expect(response.body.targetMileage).toBe(60000);
    });

    it('should fail with validation error if no targets are provided', async () => {
      const response = await request(app)
        .post(`/api/v1/vehicles/${vehicleId}/upcoming-maintenances`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          description: 'Revisão',
        });

      expect(response.status).toBe(400);
      expect(response.body.title).toBe('Erro de validação');
    });

    it('should fail if user tries to add to another user\'s vehicle (IDOR)', async () => {
      const response = await request(app)
        .post(`/api/v1/vehicles/${otherVehicleId}/upcoming-maintenances`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          description: 'Pneu',
          targetMileage: 50000,
        });

      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/v1/vehicles/:vehicleId/upcoming-maintenances', () => {
    it('should list upcoming maintenances for a vehicle', async () => {
      await prisma.upcomingMaintenance.create({
        data: { vehicleId, description: 'Test', targetMileage: 100 },
      });

      const response = await request(app)
        .get(`/api/v1/vehicles/${vehicleId}/upcoming-maintenances`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].description).toBe('Test');
    });
  });

  describe('GET /api/v1/upcoming-maintenances', () => {
    it('should list all upcoming maintenances globally for the user', async () => {
      await prisma.upcomingMaintenance.create({
        data: { vehicleId, description: 'Global Test', targetMileage: 100 },
      });

      const response = await request(app)
        .get(`/api/v1/upcoming-maintenances`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].description).toBe('Global Test');
      expect(response.body[0].vehicle).toBeDefined();
    });
  });

  describe('PUT /api/v1/vehicles/:vehicleId/upcoming-maintenances/:id', () => {
    it('should update an upcoming maintenance', async () => {
      const created = await prisma.upcomingMaintenance.create({
        data: { vehicleId, description: 'Old', targetMileage: 100 },
      });

      const response = await request(app)
        .put(`/api/v1/vehicles/${vehicleId}/upcoming-maintenances/${created.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          description: 'New',
        });

      expect(response.status).toBe(200);
      expect(response.body.description).toBe('New');
    });
  });

  describe('DELETE /api/v1/vehicles/:vehicleId/upcoming-maintenances/:id', () => {
    it('should delete an upcoming maintenance', async () => {
      const created = await prisma.upcomingMaintenance.create({
        data: { vehicleId, description: 'To delete', targetMileage: 100 },
      });

      const response = await request(app)
        .delete(`/api/v1/vehicles/${vehicleId}/upcoming-maintenances/${created.id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(204);
    });
  });
});
