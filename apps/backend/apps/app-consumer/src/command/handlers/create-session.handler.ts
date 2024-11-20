import { SessionRepository } from '@app/data/repositories';
import { Injectable } from '@nestjs/common';
import { Event } from '@weeklyscore/schema';
import { CommandHandler } from './types';
import { CreateSession } from '@weeklyscore/schema/messages';

@Injectable()
export class CreateSessionHandler implements CommandHandler<CreateSession> {
  constructor(private readonly sessions: SessionRepository) {}

  async execute({ groupId }: CreateSession['payload']) {
    const newSession = await this.sessions.createSession({
      playingGroupId: groupId,
    });

    return Event.SessionCreated({
      sessionId: newSession.id,
      groupId: newSession.playingGroupId,
    });
  }
}
