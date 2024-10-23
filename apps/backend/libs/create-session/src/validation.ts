import { pipe } from 'effect';
import { match, map, Either, gen } from 'effect/Either';
import { MessageEnvelope } from './schema';
import { ParseError } from 'effect/ParseResult';
import { SessionCommand, SessionEvent } from '@repo/schema/session';

type Invalid = {
  type: 'invalid';
  error: ParseError;
};
const Invalid = (error: ParseError) => ({ type: 'invalid', error }) as Invalid;
type Valid<T> = {
  type: 'valid';
  value: T;
};
const Valid = <T>(value: T) => ({ type: 'valid', value }) as Valid<T>;

export type ValidationResult<T> = Invalid | Valid<T>;

const Validate =
  <T>(mapper: (data: unknown) => Either<T, ParseError>) =>
  (msg: unknown) =>
    gen(function* (msg: any) {
      const env = yield* MessageEnvelope.decode(msg);
      const data = yield* mapper(env.data);
      return {
        ...env,
        data,
      };
    }).pipe(match({ onLeft: Invalid, onRight: Valid }));

export const validateEventMessage = Validate(SessionEvent.decode);
export const validateCommandMessage = Validate(SessionCommand.decode);
