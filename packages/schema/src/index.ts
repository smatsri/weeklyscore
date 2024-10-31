import { z } from "zod";

export const CreateSessionSchema = z.object({
  type: z.literal("create-session"),
  payload: z.object({
    groupId: z.string(),
  }),
});
export const AddPlayerSchema = z.object({
  type: z.literal("add-player"),
  payload: z.object({
    name: z.string(),
  }),
});

export const AddBuyinSchema = z.object({
  type: z.literal("add-buyin"),
  payload: z.object({
    sessionId: z.string(),
    playerId: z.string(),
    amount: z.number(),
  }),
});

export const CommandSchema = z.union([
  CreateSessionSchema,
  AddPlayerSchema,
  AddBuyinSchema,
]);

export type CreateSession = z.infer<typeof CreateSessionSchema>;
export type AddPlayer = z.infer<typeof AddPlayerSchema>;
export type AddBuyin = z.infer<typeof AddBuyinSchema>;
export type Command = z.infer<typeof CommandSchema>;

// Define Event schemas
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
