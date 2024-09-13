import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly client: ClientProxy;
  private couter = 0;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS, // Use the same transport as your microservice
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
  }
  getHello(): string {
    return 'Welcome Home!';
  }

  async publishTestEvent() {
    console.debug('publishTestEvent called');
    this.client.emit('test_consumer', { test: this.couter++ });
  }
}
