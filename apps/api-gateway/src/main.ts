/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

const USERS_SERVICE_URL = 'http://localhost:3001';
const ORDERS_SERVICE_URL = 'http://localhost:3002';

// Proxy endpoints
app.use(
  '/users',
  createProxyMiddleware({
    target: USERS_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use(
  '/orders',
  createProxyMiddleware({
    target: ORDERS_SERVICE_URL,
    changeOrigin: true,
  })
);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
