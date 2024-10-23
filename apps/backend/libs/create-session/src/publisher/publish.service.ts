import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PublishService {
  constructor(private readonly client: ClientProxy) {}

  async publish(command: unknown) {
    throw new Error('Not implemented');
    //return this.client.send({ cmd: COMMAND_NAME }, command);
  }
}
