import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import yamljs from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

import errorHandler from './core/middleware/error-handler.js';
import userRoutes from './modules/users/users.route.js';
import { PORT } from './core/config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use('/', userRoutes);

const swaggerPath = path.join(__dirname, './swagger.yaml');
const swaggerSpec = yamljs.load(swaggerPath);

swaggerSpec.servers = [{ url: `http://localhost:${PORT}` }];

app.get('/swagger/v1/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', serve, setup(swaggerSpec));
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});