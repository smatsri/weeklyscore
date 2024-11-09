import { z } from "zod";

export const SessionCreatedSchema = z.object({
  type: z.literal("session-created"),
  payload: z.object({
    sessionId: z.string(),
    groupId: z.string(),
  }),
});

export const PlayerAddedSchema = z.object({
  type: z.literal("player-added"),
  payload: z.object({
    playerId: z.string(),
    name: z.string(),
  }),
});

export const BuyinAddedSchema = z.object({
  type: z.literal("buyin-added"),
  payload: z.object({
    buyinId: z.string(),
    sessionId: z.string(),
    playerId: z.string(),
    amount: z.number(),
  }),
});

export const EventSchema = z.union([
  SessionCreatedSchema,
  PlayerAddedSchema,
  BuyinAddedSchema,
]);

export type SessionCreated = z.infer<typeof SessionCreatedSchema>;
export type PlayerAdded = z.infer<typeof PlayerAddedSchema>;
export type BuyinAdded = z.infer<typeof BuyinAddedSchema>;
export type Event = z.infer<typeof EventSchema>;

export const Event = {
  SessionCreated: (payload: SessionCreated["payload"]): SessionCreated => ({
    type: "session-created",
    payload,
  }),
  PlayerAdded: (payload: PlayerAdded["payload"]): PlayerAdded => ({
    type: "player-added",
    payload,
  }),
  BuyinAdded: (payload: BuyinAdded["payload"]): BuyinAdded => ({
    type: "buyin-added",
    payload,
  }),
};
