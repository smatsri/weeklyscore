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

type Success<T> = {
  success: true;
  data: T;
};

type Failure = {
  success: false;
  error?: string;
};

type ApiResponse<T> = Success<T> | Failure;

export type Api = {
  addBuyin: (amount: number, playerId: string) => Promise<ApiResponse<Buyin>>;
  addPlayer: (name: string) => Promise<ApiResponse<Player>>;
  getPlayers: () => Promise<Player[]>;
  getBuyins: () => Promise<Buyin[]>;
};

export const useNewSession = (api: Api) => {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [buyins, setBuyins] = useState<Buyin[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getPlayers(), api.getBuyins()]).then(
      ([players, buyins]) => {
        setPlayers(players);
        setBuyins(buyins);
        setLoading(false);
      }
    );
  }, [api]);

  const addBuyin = useCallback(
    async (playerId: string, amount: number) => {
      const res = await api.addBuyin(amount, playerId);
      if (res.success) {
        setBuyins([...buyins, res.data]);
      }

      return res.success;
    },
    [api, buyins]
  );

  const addPlayer = useCallback(
    async (name: string) => {
      const res = await api.addPlayer(name);
      if (res.success) {
        const newPlayers = [...players, res.data];
        console.debug(newPlayers);
        setPlayers(newPlayers);
      }
      return res.success;
    },
    [api, players]
  );

  console.debug({
    players,
  });
  return {
    players,
    buyins,
    addBuyin,
    addPlayer,
    loading,
  };
};

export type NewSession = ReturnType<typeof useNewSession>;
