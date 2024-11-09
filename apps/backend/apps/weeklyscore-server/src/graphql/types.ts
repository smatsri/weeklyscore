import { PlaySession, Buyin, Player } from '@app/domain/entities/types';

export interface DataSource {
  addPlayer(name: string): Promise<Player>;
  addBuyin(playerId: string, amount: number, sessionId: string): Promise<Buyin>;
  createSession(groupId: string): Promise<PlaySession>;
}
