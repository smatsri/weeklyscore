import { Command } from "@weeklyscore/schema";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Api } from "./types";
import { sessionReducer, initialState } from "./session.reducer";

export const useNewSession = (sessionId: string, api: Api) => {
  const [loading, setLoading] = useState(false);

  const [{ buyins, players }, dispatch] = useReducer(
    sessionReducer,
    initialState
  );

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getPlayers(), api.getBuyins()]).then(
      ([players, buyins]) => {
        dispatch({
          type: "init",
          payload: { players, buyins },
        });
        setLoading(false);
      }
    );

    const unsubscribe = api.subscribe(dispatch);
    return unsubscribe;
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
