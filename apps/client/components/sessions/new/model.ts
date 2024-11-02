import { BuyinAdded, Command, Event, PlayerAdded } from "@weeklyscore/schema";
import { useCallback, useEffect, useState } from "react";

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
  publish: (cmd: Command) => Promise<ApiResponse>;
  getPlayers: () => Promise<Player[]>;
  getBuyins: () => Promise<Buyin[]>;
  subscribe: (callback: (event: Event) => void) => Unsubscribe;
};

export const useNewSession = (sessionId: string, api: Api) => {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [buyins, setBuyins] = useState<Buyin[]>([]);

  const handlePlayerAdded = useCallback((event: PlayerAdded) => {
    const player: Player = {
      id: event.payload.playerId,
      name: event.payload.name,
    };
    setPlayers((players) => [...players, player]);
  }, []);

  const handleBuyinAdded = useCallback(
    (event: BuyinAdded) => {
      const player = players.find(
        (player) => player.id === event.payload.playerId
      );

      if (!player) {
        throw new Error("Player not found");
      }

      const buyin: Buyin = {
        id: event.payload.buyinId,
        date: new Date(),
        amount: event.payload.amount,
        player,
      };
      setBuyins((buyins) => [...buyins, buyin]);
    },
    [players]
  );

  const onEvent = useCallback(
    (event: Event) => {
      switch (event.type) {
        case "player-added":
          return handlePlayerAdded(event);
        case "buyin-added":
          return handleBuyinAdded(event);
      }
    },
    [players]
  );

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getPlayers(), api.getBuyins()]).then(
      ([players, buyins]) => {
        setPlayers(players);
        setBuyins(buyins);
        setLoading(false);
      }
    );

    const unsubscribe = api.subscribe(onEvent);
    return () => {
      unsubscribe();
    };
  }, [api]);

  const createSession = useCallback(async () => {
    const cmd: Command = {
      type: "create-session",
      payload: {
        groupId: "1",
      },
    };
    const res = await api.publish(cmd);
    return res.success;
  }, [api]);

  const addBuyin = useCallback(
    async (playerId: string, amount: number) => {
      const cmd: Command = {
        type: "add-buyin",
        payload: { sessionId: sessionId, playerId, amount },
      };
      const res = await api.publish(cmd);
      return res.success;
    },
    [api, buyins, players]
  );

  const addPlayer = useCallback(
    async (name: string) => {
      const cmd: Command = {
        type: "add-player",
        payload: { name },
      };
      const res = await api.publish(cmd);
      return res.success;
    },
    [api, players]
  );

  return {
    loading,
    players,
    buyins,
    addBuyin,
    addPlayer,
    createSession,
  };
};

export type NewSession = ReturnType<typeof useNewSession>;
