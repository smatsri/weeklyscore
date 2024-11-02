import { Command, Event } from "@weeklyscore/schema";

export type Player = {
  id: string;
  name: string;
};

export type Buyin = {
  id: string;
  date: Date;
  amount: number;
  player: Player;
};

export type ApiResponse = {
  success: boolean;
};

type Unsubscribe = () => void;

export type Api = {
  getPlayers: () => Promise<Player[]>;
  getBuyins: () => Promise<Buyin[]>;
  publish: (cmd: Command) => Promise<ApiResponse>;
  subscribe: (callback: (event: Event) => void) => Unsubscribe;
};
