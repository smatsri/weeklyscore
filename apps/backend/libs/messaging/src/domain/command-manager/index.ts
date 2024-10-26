import { CommandTracker } from '../command-tracker/command-tracker';
import { Config, IPublisher, Message } from '../types';
import { CommandResult } from './types';

export class CommandManager<TCmd, TResult> {
  public constructor(
    protected publisher: IPublisher,
    protected tracker: CommandTracker,
    protected config: Config,
  ) { }

  publishCmd(correlationId: string, cmd: TCmd, track = true) {
    const msg = Message(correlationId, cmd);

    this.publisher.publish(this.config.COMMAND_TOPIC, msg);

    if (track) {
      this.tracker.startTrack(correlationId);
    }
  }

  async publishResult(correlationId: string, event: TResult) {
    const msg = Message(correlationId, event);
    await this.tracker.setResult(correlationId, event);
    this.publisher.publish(this.config.EVENT_TOPIC, msg);
  }

  async getResult<T>(correlationId: string): Promise<CommandResult<T>> {
    const isActive = this.tracker.isActive(correlationId);
    if (!isActive) {
      return CommandResult.NotFound();
    }

    const trackingRes = await this.tracker.getResult<T>(correlationId);

    switch (trackingRes.type) {
      case 'track-pending':
        return CommandResult.StillPending();

      case 'track-complete':
        return CommandResult.Completed<T>(trackingRes.value);

      case 'track-complete-multiple':
        return CommandResult.CompletedMultiple(trackingRes.values);
      default:
        return CommandResult.NotFound();
    }
  }

  clear(correlationId: string) {
    this.tracker.stopTracking(correlationId);
  }
}
