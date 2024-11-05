import { Injectable, Type } from '@nestjs/common';
import { Command } from '@weeklyscore/schema';
import { AddBuyinHandler } from './add-buyin.handler';
import { AddPlayerHandler } from './add-player.handler';
import { ModuleRef } from '@nestjs/core';
import { CommandHandler } from './types';
import { CreateSessionHandler } from './create-session.handler';

@Injectable()
export class Handler {
  constructor(private readonly moduleRef: ModuleRef) {}

  async execute(command: Command) {
    const handler = this.moduleRef.get(Handlers[command.type], {
      strict: false,
    }) as CommandHandler<any>;

    if (!handler) {
      throw new Error('Handler not found');
    }
    return await handler.execute(command);
  }
}

const Handlers: Record<Command['type'], Type> = {
  'add-buyin': AddBuyinHandler,
  'add-player': AddPlayerHandler,
  'create-session': CreateSessionHandler,
};
