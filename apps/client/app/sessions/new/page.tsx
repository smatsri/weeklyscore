"use client";

import NewSession from "@/components/sessions/new/new-session";
import { Api, Buyin } from "@/components/sessions/new/model";

const players = [
  { id: "1", name: "אלה כהן" },
  { id: "2", name: "דוד לוי" },
  { id: "3", name: "מיכל גולן" },
  { id: "4", name: "יוסף אברהם" },
  { id: "5", name: "רחל ברק" },
];

const buyin: Buyin[] = [
  { player: players[0], amount: 1000, date: new Date(), id: "1" },
  { player: players[1], amount: 1500, date: new Date(), id: "2" },
  { player: players[2], amount: 750, date: new Date(), id: "3" },
  { player: players[3], amount: 2000, date: new Date(), id: "4" },
  { player: players[4], amount: 1250, date: new Date(), id: "5" },
];

const findPlayer = (id: string) => players.find((player) => player.id === id);

const api: Api = {
  addBuyin: async (amount: number, playerId: string) => {
    const player = findPlayer(playerId);
    if (!player) {
      return { success: false };
    }
    const buyinId = (buyin.length + 1).toString();
    return {
      success: true,
      data: {
        amount,
        player: player,
        id: buyinId,
        date: new Date(),
      },
    };
  },
  addPlayer: async (name: string) => {
    const id = (players.length + 1).toString();
    const player = { id, name, createdAt: new Date(), updatedAt: new Date() };
    players.push(player);
    return {
      success: true,
      data: player,
    };
  },
  getPlayers: async () => [...players],
  getBuyins: async () => [...buyin],
};

const NewSessionPage = () => {
  return <NewSession api={api} />;
};

export default NewSessionPage;
