import {
  BuyinRepository,
  PlayerRepository,
  SessionRepository,
} from '@app/data/repositories';
import { Injectable } from '@nestjs/common';
import {
  Command,
  CreateSession,
  Event,
  AddBuyin,
  AddPlayer,
} from '@weeklyscore/schema';

const { BuyinAdded, PlayerAdded, SessionCreated } = Event;

@Injectable()
export class CommandService {
  constructor(
    private readonly players: PlayerRepository,
    private readonly buyins: BuyinRepository,
    private readonly sessions: SessionRepository,
  ) {}

  async handle(command: Command) {
    console.log(`Received command: ${command}`);

    switch (command.type) {
      case 'add-buyin':
        return this.addBuyin(command);
      case 'add-player':
        return this.addPlayer(command);
      case 'create-session':
        return this.createSession(command);
    }
  }

  private async createSession(command: CreateSession) {
    console.log('Creating session');
    const newSession = await this.sessions.createSession({
      playingGroupId: command.payload.groupId,
    });

    return SessionCreated({
      sessionId: newSession.id,
      groupId: newSession.playingGroupId,
    });
  }

  private async addPlayer(command: AddPlayer) {
    console.log('Adding player');

    const newPlayer = await this.players.createPlayer({
      name: command.payload.name,
    });

    return PlayerAdded({
      playerId: newPlayer.id,
      name: newPlayer.name,
    });
  }

  private async addBuyin(command: AddBuyin) {
    console.log('Adding buyin');

    const newBuyin = await this.buyins.createBuyin({
      amount: command.payload.amount,
      playerId: command.payload.playerId,
      playSessionId: command.payload.sessionId,
    });

    return BuyinAdded({
      buyinId: newBuyin.id,
      amount: newBuyin.amount,
      playerId: newBuyin.playerId,
      sessionId: newBuyin.playSessionId,
    });
  }
}
