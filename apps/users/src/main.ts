/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { KafkaService } from '@vinyl/kafka';

const app = express();

app.get('/users', async (req, res) => {
  const service = new KafkaService();
  console.log('111', service);
  await service.produceMessage('test-topic', [
    { value: 'Hello KafkaJS user!' },
  ]);
  res.send({ message: 'Message produced from users service' });
});

const port = process.env.port || 3001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/users`);
});
server.on('error', console.error);
