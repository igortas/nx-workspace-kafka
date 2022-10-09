/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { KafkaService } from '@vinyl/kafka';

const app = express();

const service = new KafkaService();
service.consumeMessage('test-group', 'test-topic');

app.get('/orders', (req, res) => {
  res.send({ message: 'Welcome to orders!' });
});

const port = process.env.port || 3002;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/orders`);
});
server.on('error', console.error);
