import { Schema } from "effect";

export const CreateSession = Schema.Struct({
  type: Schema.Literal("create-session"),
});

export const CreatePlayer = Schema.Struct({
  type: Schema.Literal("create-player"),
  payload: Schema.Struct({
    name: Schema.NonEmptyString,
  }),
});

export const CreateBuyin = Schema.Struct({
  type: Schema.Literal("create-buyin"),
  payload: Schema.Struct({
    sessionId: Schema.NonEmptyString,
    amount: Schema.Int.pipe(Schema.positive()),
    playerId: Schema.String,
  }),
});

export const SessionCommandSchema = Schema.Union(
  CreateSession,
  CreatePlayer,
  CreateBuyin
);

const SessionCreated = Schema.Struct({
  type: Schema.Literal("session-created"),
  payload: Schema.Struct({
    id: Schema.String,
    date: Schema.Date,
  }),
});

const PlayerCreated = Schema.Struct({
  type: Schema.Literal("player-created"),
  payload: Schema.Struct({
    id: Schema.String,
    name: Schema.NonEmptyString,
  }),
});

const BuyinCreated = Schema.Struct({
  type: Schema.Literal("buyin-created"),
  payload: Schema.Struct({
    id: Schema.String,
    amount: Schema.Int,
    playerId: Schema.String,
  }),
});

export const SessionEventSchema = Schema.Union(
  SessionCreated,
  PlayerCreated,
  BuyinCreated
);

export const SessionCommand = {
  encode: Schema.encodeUnknownEither(SessionCommandSchema),
  decode: Schema.decodeUnknownEither(SessionCommandSchema),
};

export const SessionEvent = {
  encode: Schema.encodeUnknownEither(SessionEventSchema),
  decode: Schema.decodeUnknownEither(SessionEventSchema),
};

export type SessionEvent = Schema.Schema.Type<typeof SessionEventSchema>;
export type SessionCommand = Schema.Schema.Type<typeof SessionCommandSchema>;

type X = ReturnType<typeof SessionEvent.decode>;
