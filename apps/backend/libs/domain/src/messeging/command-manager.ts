import { Config, ICommandTracker, IPublisher, Message, Timed } from './types';

export class CommandManager<TCmd> {
  constructor(
    private publisher: IPublisher,
    private tracker: ICommandTracker,
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
      return { type: 'not-found' };
    }

    const trackingRes = this.tracker.getResult(correlationId);

    switch (trackingRes.type) {
      case 'track-pending':
        return { type: 'still-pending' };

      case 'track-complete':
        if (!keepTracking) {
          this.tracker.stopTracking(correlationId);
        }
        return { type: 'completed', result: trackingRes.value };

      case 'track-complete-multiple':
        if (!keepTracking) {
          this.tracker.stopTracking(correlationId);
        }
        return { type: 'completed-multiple', results: trackingRes.values };
    }
  }
}

type NotFound = { type: 'not-found' };
type StillPending = { type: 'still-pending' };
type Completed = { type: 'completed'; result: Timed<unknown> };
type CompletedMultiple = {
  type: 'completed-multiple';
  results: Timed<unknown>[];
};

export type CommandResult =
  | NotFound
  | StillPending
  | Completed
  | CompletedMultiple;
