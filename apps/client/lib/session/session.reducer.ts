import { Event } from "@weeklyscore/schema";
import { Buyin, Player } from "../types";

type State = {
  loading: boolean;
  players: Player[];
  buyins: Buyin[];
};

type SEvent =
  | Event
  | {
      type: "init";
      payload: {
        players: Player[];
        buyins: Buyin[];
      };
    };

export const initialState: State = {
  loading: false,
  players: [],
  buyins: [],
};

const UnknowPlayer: Player = { id: "unknown", name: "Unknown" };

export const sessionReducer = (state = initialState, evt: SEvent): State => {
  switch (evt.type) {
    case "init":
      return {
        ...state,
        players: evt.payload.players,
        buyins: evt.payload.buyins,
      };

    case "player-added":
      return {
        ...state,
        players: [
          ...state.players,
          { id: evt.payload.playerId, name: evt.payload.name },
        ],
      };
    case "buyin-added":
      const player = state.players.find(
        (player) => player.id === evt.payload.playerId
      );

      return {
        ...state,
        buyins: [
          ...state.buyins,
          {
            id: evt.payload.buyinId,
            date: new Date(),
            amount: evt.payload.amount,
            player: player || UnknowPlayer,
          },
        ],
      };
  }

  return state;
};
