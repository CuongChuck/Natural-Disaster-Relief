import express from 'express';
import yaml from 'js-yaml';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import { serve, setup } from 'swagger-ui-express';
import { fileURLToPath } from 'url';

import errorHandler from './core/middleware/error-handler.js';
import { PORT } from './core/config/env.js';

import userRoutes from './modules/users/users.route.js';
import categoryRoutes from './modules/category/category.route.js';
import unitRoutes from './modules/unit/unit.route.js';
import supplyRoutes from './modules/supply/supply.route.js';
import eventRoutes from './modules/event/event.route.js';
import mapRoutes from './modules/map/map.route.js';
import requestRoutes from './modules/request/request.route.js';
import deliveryRoutes from './modules/delivery/delivery.route.js';
import container from './core/middleware/awilix-container.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json());
app.use('/', userRoutes);
app.use('/', categoryRoutes);
app.use('/', unitRoutes);
app.use('/', supplyRoutes);
app.use('/', eventRoutes);
app.use('/map', mapRoutes);
app.use('/', requestRoutes);
app.use('/', deliveryRoutes);

const swaggerPath = path.join(__dirname, './swagger.yaml');
const swaggerSpec = yaml.load(fs.readFileSync(swaggerPath, 'utf-8'));

swaggerSpec.servers = [{ url: `http://localhost:${PORT}` }];

app.get('/swagger/v1/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', serve, setup(swaggerSpec));
}

app.set('container', container);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});