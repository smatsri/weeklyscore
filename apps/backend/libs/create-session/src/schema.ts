import { Schema } from 'effect';

export const MessageEnvelopeSchema = Schema.Struct({
  requestId: Schema.String,
  callerId: Schema.String,
  data: Schema.Unknown,
});

export type MessageEnvelope = Schema.Schema.Type<typeof MessageEnvelopeSchema>;

export const MessageEnvelope = {
  encode: Schema.encodeUnknownEither(MessageEnvelopeSchema),
  decode: Schema.encodeUnknownEither(MessageEnvelopeSchema),
};
