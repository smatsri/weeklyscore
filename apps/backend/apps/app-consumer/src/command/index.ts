import { Injectable } from '@nestjs/common';
import {
  Command,
  CreateSession,
  Event,
  AddBuyin,
  AddPlayer,
} from '@weeklyscore/schema';

@Injectable()
export class CommandService {
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

  private createSession(command: CreateSession): Event {
    console.log('Creating session');
    return {
      type: 'session-created',
      payload: {
        sessionId: '123',
        groupId: command.payload.groupId,
      },
    };
  }

  private addPlayer(command: AddPlayer): Event {
    console.log('Adding player');
    return {
      type: 'player-added',
      payload: {
        playerId: '123',
        name: command.payload.name,
      },
    };
  }

  private addBuyin(command: AddBuyin): Event {
    console.log('Adding buyin');
    return {
      type: 'buyin-added',
      payload: {
        amount: command.payload.amount,
        playerId: command.payload.playerId,
        buyinId: '123',
        sessionId: command.payload.sessionId,
      },
    };
  }
}
