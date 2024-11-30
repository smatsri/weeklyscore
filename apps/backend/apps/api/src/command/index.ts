import { Injectable } from '@nestjs/common';
import { Command, Event } from '@weeklyscore/schema';
import { Handler } from './handlers/handler';
import { Result, Success, Fail } from '../utils/result';

@Injectable()
export class CommandService {
  constructor(private readonly handler: Handler) { }

  async handle(command: Command): Promise<Result<Event>> {
    try {
      const event = await this.handler.execute(command);
      return Success(event);
    } catch (error) {
      return Fail(error);
    }
  }
}
