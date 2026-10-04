import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';
import { authService } from '../../src/services/auth.service';

const prisma = new PrismaClient();

describe('Maintenance Routes (Integration Tests)', () => {
  let token: string;
  let userId: string;
  let vehicleId: string;
  let maintenanceId: string;

  beforeAll(async () => {
    // 1. Create a user via API
    const registerResponse = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Maintenance Test User',
        email: 'maintenance.test@example.com',
        password: 'password123',
      });
    
    // We can just login directly
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'maintenance.test@example.com',
        password: 'password123',
      });
    
    token = loginResponse.body.token;

    // Decode token to get userId
    const decoded = authService.verifyToken(token);
    userId = decoded.userId;

    // 3. Create a vehicle
    const vehicleResponse = await request(app)
      .post('/api/v1/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        brand: 'Honda',
        model: 'Civic',
        year: 2021,
        licensePlate: 'XYZ-9876',
        currentMileage: 20000,
      });

    vehicleId = vehicleResponse.body.id;
  });

  afterAll(async () => {
    if (vehicleId) {
      await prisma.maintenance.deleteMany({ where: { vehicleId } });
    }
    if (userId) {
      await prisma.vehicle.deleteMany({ where: { userId } });
      await prisma.user.deleteMany({ where: { id: userId } });
    }
    await prisma.$disconnect();
  });

  it('POST /api/v1/vehicles/:vehicleId/maintenances > should create a maintenance', async () => {
    const response = await request(app)
      .post(`/api/v1/vehicles/${vehicleId}/maintenances`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: new Date().toISOString(),
        type: 'Preventiva',
        cost: 300,
        description: 'Troca de pastilhas de freio',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.cost).toBe(300);
    maintenanceId = response.body.id;
  });

  it('GET /api/v1/vehicles/:vehicleId/maintenances > should list maintenances and total cost', async () => {
    const response = await request(app)
      .get(`/api/v1/vehicles/${vehicleId}/maintenances`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('totalCost');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.totalCost).toBeGreaterThan(0);
  });

  it('GET /api/v1/vehicles/:vehicleId/maintenances/:id > should get maintenance by id', async () => {
    const response = await request(app)
      .get(`/api/v1/vehicles/${vehicleId}/maintenances/${maintenanceId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(maintenanceId);
  });

  it('PUT /api/v1/vehicles/:vehicleId/maintenances/:id > should update maintenance', async () => {
    const response = await request(app)
      .put(`/api/v1/vehicles/${vehicleId}/maintenances/${maintenanceId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        cost: 400,
      });

    expect(response.status).toBe(200);
    expect(response.body.cost).toBe(400);
  });

  it('DELETE /api/v1/vehicles/:vehicleId/maintenances/:id > should delete maintenance', async () => {
    const response = await request(app)
      .delete(`/api/v1/vehicles/${vehicleId}/maintenances/${maintenanceId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);

    const checkResponse = await request(app)
      .get(`/api/v1/vehicles/${vehicleId}/maintenances/${maintenanceId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(checkResponse.status).toBe(404);
  });
});
