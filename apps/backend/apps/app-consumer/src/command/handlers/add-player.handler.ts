import { PlayerRepository } from '@app/data/repositories';
import { Injectable } from '@nestjs/common';
import { AddPlayer, Event } from '@weeklyscore/schema';
import { CommandHandler } from './types';

@Injectable()
export class AddPlayerHandler implements CommandHandler<AddPlayer> {
  constructor(private readonly players: PlayerRepository) {}

  async execute(command: AddPlayer) {
    const newPlayer = await this.players.createPlayer({
      name: command.payload.name,
    });

    return Event.PlayerAdded({
      playerId: newPlayer.id,
      name: newPlayer.name,
    });
  }
}
