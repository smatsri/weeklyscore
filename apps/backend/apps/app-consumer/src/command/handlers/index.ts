import { Injectable } from '@nestjs/common';
import { Command } from '@weeklyscore/schema';
import { AddBuyinHandler } from './add-buyin.handler';
import { AddPlayerHandler } from './add-player.handler';
import { CreateSessionHandler } from './create-session.handler';

@Injectable()
export class CommandHandler {
  constructor(
    private readonly addPlayerHandler: AddPlayerHandler,
    private readonly addBuyinHandler: AddBuyinHandler,
    private readonly createSessionHandler: CreateSessionHandler,
  ) {}

  async execute(command: Command) {
    switch (command.type) {
      case 'add-buyin':
        return this.addBuyinHandler.execute(command);
      case 'add-player':
        return this.addPlayerHandler.execute(command);
      case 'create-session':
        return this.createSessionHandler.execute(command);
      default:
        throw new Error('Command not found');
    }
  }
}
