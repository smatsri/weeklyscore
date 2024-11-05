import { Injectable } from '@nestjs/common';
import { Command, Event } from '@weeklyscore/schema';
import { Handler } from './handlers';

const Success = (event: Event) => ({
  success: true,
  event,
});

const Error = (error: Error) => ({
  success: false,
  error,
});

@Injectable()
export class CommandService {
  constructor(private readonly handler: Handler) {}

  async handle(command: Command) {
    try {
      const event = await this.handler.execute(command);
      return Success(event);
    } catch (error) {
      console.error(error);
      return Error(error);
    }
  }
}
