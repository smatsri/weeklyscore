import { Command, Event } from '@weeklyscore/schema';

export interface CommandHandler<T extends Command> {
  execute: (command: T) => Promise<Event>;
}
