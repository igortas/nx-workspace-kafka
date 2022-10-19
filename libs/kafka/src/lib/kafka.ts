import { Kafka, Partitioners } from 'kafkajs';

export class KafkaService {
  #kafka: Kafka = null;

  constructor() {
    this.#kafka = new Kafka({
      clientId: 'vinyl-app',
      brokers: ['0.0.0.0:9092'],
    });
    return this;
  }

  async produceMessage(topic: string, messages: { value: any }[]) {
    const producer = this.#kafka.producer({});
    await producer.connect();
    await producer.send({
      topic,
      messages,
    });

    await producer.disconnect();
    return this;
  }

  async consumeMessage(groupId: string, topic: string) {
    const consumer = this.#kafka.consumer({ groupId });

    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
    return this;
  }
}
