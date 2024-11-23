import { Resolvers } from '@weeklyscore/schema/graphql';
import { DataSource } from './types';

export const resolvers: Resolvers<{ ds: DataSource }> = {
  Mutation: {
    addBuyin: async (_, { input }, { ds }) => {
      const res = await ds.addBuyin(
        input.playerId,
        input.amount,
        input.sessionId,
      );

      return {
        amount: res.amount,
        id: res.id,
        playerId: res.playerId,
        sessionId: res.playSessionId,
      };
    },
    addPlayer: async (_, { input }, { ds }) => {
      const res = await ds.addPlayer(input.name);

      return {
        id: res.id,
        name: res.name,
      };
    },
    createSession: async (_, { input }, { ds }) => {
      const res = await ds.createSession(input.groupId);

      return {
        id: res.id,
        groupId: res.playingGroupId,
      };
    },
  },
};
