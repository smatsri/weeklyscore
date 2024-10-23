import { pipe } from 'effect';
import { match, map } from 'effect/Either';
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
  <T>(decode: (data: unknown) => T) =>
  (msg: any) =>
    pipe(
      MessageEnvelope.decode(msg),
      map(({ data }) => decode(data)),
      match({ onLeft: Invalid, onRight: Valid }),
    );

export const validateEventMessage = Validate(SessionEvent.decode);
export const validateCommandMessage = Validate(SessionCommand.decode);
