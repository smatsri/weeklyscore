import { CommandTracker } from '../command-tracker/command-tracker';
import { Config, IPublisher, Message } from '../types';
import { CommandResult } from './types';

export class CommandManager<TCmd, TResult> {
  constructor(
    private publisher: IPublisher,
    private tracker: CommandTracker,
    private config: Config,
  ) {}

  publishCmd(correlationId: string, cmd: TCmd, track = true) {
    const msg = Message(correlationId, cmd);

    this.publisher.publish(this.config.COMMAND_TOPIC, msg);

    if (track) {
      this.tracker.startTrack(correlationId);
    }
  }

  publishResult(correlationId: string, event: TResult) {
    const msg = Message(correlationId, event);
    this.publisher.publish(this.config.EVENT_TOPIC, msg);
  }

  async getResult(correlationId: string) {
    const isActive = this.tracker.isActive(correlationId);
    if (!isActive) {
      return CommandResult.NotFound();
    }

    const trackingRes = await this.tracker.getResult(correlationId);

    switch (trackingRes.type) {
      case 'track-pending':
        return CommandResult.StillPending();

      case 'track-complete':
        return CommandResult.Completed(trackingRes.value);

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
