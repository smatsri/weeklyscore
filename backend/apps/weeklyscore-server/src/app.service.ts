import { TestEvent } from '@app/domain/events';
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
    const evt: TestEvent = { message: 'test ' + this.couter++ };
    console.debug('publishTestEvent called', evt);
    this.client.emit('test_consumer', evt);
  }
}
