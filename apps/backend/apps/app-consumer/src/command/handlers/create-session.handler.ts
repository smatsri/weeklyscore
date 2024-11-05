import { SessionRepository } from '@app/data/repositories';
import { Injectable } from '@nestjs/common';
import { CreateSession, Event } from '@weeklyscore/schema';
import { CommandHandler } from './types';

@Injectable()
export class CreateSessionHandler implements CommandHandler<CreateSession> {
  constructor(private readonly sessions: SessionRepository) {}

  async execute(command: CreateSession) {
    const newSession = await this.sessions.createSession({
      playingGroupId: command.payload.groupId,
    });

    return Event.SessionCreated({
      sessionId: newSession.id,
      groupId: newSession.playingGroupId,
    });
  }
}
