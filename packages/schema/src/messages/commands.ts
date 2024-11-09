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
