import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);

export default app;
