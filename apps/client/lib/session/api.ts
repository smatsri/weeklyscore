import { getBuyins, getPlayers } from "../data/api/session";

export const useApi = (groupId: string, sessionId: string) => {
  return {
    getPlayers: async () => {
      const a = await getPlayers(groupId);
      return a.map((p: any) => ({ id: p.id, name: p.name }));
    },
    getBuyins: async () => {
      const a = await getBuyins(sessionId);
      return a.map((b) => ({
        id: b.id,
        date: new Date(b.date),
        amount: b.amount,
        player: { id: b.playerId, name: b.playerName },
      }));
    },
  };
};
