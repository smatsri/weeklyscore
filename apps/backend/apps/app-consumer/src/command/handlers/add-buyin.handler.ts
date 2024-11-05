import { BuyinRepository } from '@app/data/repositories';
import { Injectable } from '@nestjs/common';
import { AddBuyin, Event } from '@weeklyscore/schema';
import { CommandHandler } from './types';

@Injectable()
export class AddBuyinHandler implements CommandHandler<AddBuyin> {
  constructor(private readonly buyins: BuyinRepository) {}

  async execute(command: AddBuyin) {
    const newBuyin = await this.buyins.createBuyin({
      amount: command.payload.amount,
      playerId: command.payload.playerId,
      playSessionId: command.payload.sessionId,
    });

    return Event.BuyinAdded({
      buyinId: newBuyin.id,
      amount: newBuyin.amount,
      playerId: newBuyin.playerId,
      sessionId: newBuyin.playSessionId,
    });
  }
}
