import { CommandSchema, Command } from '@weeklyscore/schema';
import { option, none, some, Option } from './option';

const parseSessionId = (pattern: string): Option<string> => {
  const [, sessionId] = pattern.split('.');
  if (!sessionId) {
    return none();
  }
  return some(sessionId);
};

export const validateCommand = (data: any): Option<Command> => {
  const result = CommandSchema.safeParse(data);
  if (!result.success) {
    return none();
  }
  return some(result.data);
};

const parseJson = (message: string): Option<any> => {
  if (!message) {
    return none();
  }
  try {
    const json = JSON.parse(message);
    return some(json);
  } catch (error) {
    return none();
  }
};

export const parseMessage = (channel: string, message: string) =>
  option(function* (_) {
    let sessionId = yield* _(parseSessionId(channel));
    let data = yield* _(parseJson(message));
    let command = yield* _(validateCommand(data));
    return { sessionId, command };
  });
