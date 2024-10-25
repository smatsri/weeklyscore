import { CommandTracker } from '../command-tracker/command-tracker';
import { Config, IPublisher, Message, Timed } from '../types';
import { CommandResult } from './types';

export class CommandManager<TCmd, TEvt> {
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

  getResult(correlationId: string, keepTracking = true): CommandResult {
    if (!this.tracker.isActive(correlationId)) {
      return CommandResult.NotFound();
    }

    const trackingRes = this.tracker.getResult(correlationId);

    switch (trackingRes.type) {
      case 'track-pending':
        return CommandResult.StillPending();

      case 'track-complete':
        if (!keepTracking) {
          this.tracker.stopTracking(correlationId);
        }

        return CommandResult.Completed(trackingRes.value);

      case 'track-complete-multiple':
        if (!keepTracking) {
          this.tracker.stopTracking(correlationId);
        }
        return CommandResult.CompletedMultiple(trackingRes.values);
      default:
        return CommandResult.NotFound();
    }
  }

  publishEvent(correlationId: string, event: TEvt) {
    const msg = Message(correlationId, event);
    this.publisher.publish(this.config.EVENT_TOPIC, msg);
  }
}
