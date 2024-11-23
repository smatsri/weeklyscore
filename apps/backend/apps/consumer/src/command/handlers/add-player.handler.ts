import { PlayerRepository } from '@app/data/repositories';
import { Injectable } from '@nestjs/common';
import { Event } from '@weeklyscore/schema';
import { CommandHandler } from './types';
import { AddPlayer } from '@weeklyscore/schema';

@Injectable()
export class AddPlayerHandler implements CommandHandler<AddPlayer> {
  constructor(private readonly players: PlayerRepository) {}

  async execute({ name }: AddPlayer['payload']) {
    const newPlayer = await this.players.createPlayer({
      name,
    });

    return Event.PlayerAdded({
      playerId: newPlayer.id,
      name: newPlayer.name,
    });
  }
}
