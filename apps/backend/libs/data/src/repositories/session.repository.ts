import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaySession } from '../entities';
@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(PlaySession)
    private readonly repo: Repository<PlaySession>,
  ) {}

  async createSession(session: Partial<PlaySession>): Promise<PlaySession> {
    const newSession = this.repo.create(session);
    const res = await this.repo.save(newSession);
    return res;
  }
}
