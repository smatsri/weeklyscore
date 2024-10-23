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
    amount: Schema.Int.pipe(Schema.positive()),
    playerId: Schema.String,
  }),
});

export const SessionCommand = Schema.Union(
  CreateSession,
  CreatePlayer,
  CreateBuyin
);

export type SessionCommand = Schema.Schema.Type<typeof SessionCommand>;

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

export const SessionEvent = Schema.Union(
  SessionCreated,
  PlayerCreated,
  BuyinCreated
);

export type SessionEvent = Schema.Schema.Type<typeof SessionEvent>;
