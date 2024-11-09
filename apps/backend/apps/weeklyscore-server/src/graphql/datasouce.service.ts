import {
  BuyinRepository,
  PlayerRepository,
  SessionRepository,
} from '@app/data/repositories';
import { DataSource } from './types';
import { PlaySession, Buyin, Player } from '@app/domain/entities/types';

export class DataSourceSerice implements DataSource {
  constructor(
    private readonly buyins: BuyinRepository,
    private readonly players: PlayerRepository,
    private readonly playSessions: SessionRepository,
  ) {}

  async addPlayer(name: string): Promise<Player> {
    const newPlayer = await this.players.createPlayer({ name });
    return newPlayer;
  }

  async addBuyin(
    playerId: string,
    amount: number,
    sessionId: string,
  ): Promise<Buyin> {
    const newBuyin = await this.buyins.createBuyin({
      amount,
      playerId,
      playSessionId: sessionId,
    });

    return newBuyin;
  }
  async createSession(groupId: string): Promise<PlaySession> {
    const newSession = await this.playSessions.createSession({
      playingGroupId: groupId,
    });
    return newSession;
  }
}
