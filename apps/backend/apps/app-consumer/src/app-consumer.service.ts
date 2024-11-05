import { Injectable } from '@nestjs/common';
import { CommandService } from './command';
import { parseMessage } from './validattion';
import { isSuccess } from './utils/result';
import { RedisConsumerBase } from './consumer-base.class';
import { isNone } from './utils/option';

@Injectable()
export class AppConsumerService extends RedisConsumerBase {
  constructor(private readonly commandService: CommandService) {
    super();
  }

  protected async onMessage(pattern: string, channel: string, message: string) {
    const cmd = parseMessage(channel, message);

    if (isNone(cmd)) {
      console.error('Invalid message:', message);
      return;
    }

    const { sessionId, command } = cmd.value;
    const res = await this.commandService.handle(command);

    if (isSuccess(res)) {
      await this.publishEvent(sessionId, res.value);
    } else {
      console.error('Command failed', res.error);
    }
  }
}
