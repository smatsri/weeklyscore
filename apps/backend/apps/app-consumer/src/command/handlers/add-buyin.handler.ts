import { BuyinRepository } from '@app/data/repositories';
import { Injectable } from '@nestjs/common';
import { AddBuyin, Event } from '@weeklyscore/schema/messages';
import { CommandHandler } from './types';

@Injectable()
export class AddBuyinHandler implements CommandHandler<AddBuyin> {
  constructor(private readonly buyins: BuyinRepository) {}

  async execute({ amount, playerId, sessionId }: AddBuyin['payload']) {
    const newBuyin = await this.buyins.createBuyin({
      amount,
      playerId,
      playSessionId: sessionId,
    });

    return Event.BuyinAdded({
      buyinId: newBuyin.id,
      amount: newBuyin.amount,
      playerId: newBuyin.playerId,
      sessionId: newBuyin.playSessionId,
    });
  }
}
