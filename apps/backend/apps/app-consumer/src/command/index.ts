import { Injectable } from '@nestjs/common';
import { Command, Event } from '@weeklyscore/schema';
import { Handler } from './handlers';

@Injectable()
export class CommandService {
  constructor(private readonly handler: Handler) {}

  async handle(command: Command): Promise<Result> {
    try {
      const event = await this.handler.execute(command);
      return Success(event);
    } catch (error) {
      console.error(error);
      return Error();
    }
  }
}

type Success = { success: true; event: Event };
type Error = { success: false };
type Result = Success | Error;

const Success = (event: Event): Success => ({
  success: true,
  event,
});

const Error = (): Error => ({
  success: false,
});
