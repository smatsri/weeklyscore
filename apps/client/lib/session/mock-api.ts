import { Api, Buyin, Player } from "@/components/sessions/new/model";
import { Command, Event } from "@weeklyscore/schema";
import { useCallback, useState } from "react";

const init_players = [
  { id: "1", name: "אלה כהן" },
  { id: "2", name: "דוד לוי" },
  { id: "3", name: "מיכל גולן" },
  { id: "4", name: "יוסף אברהם" },
  { id: "5", name: "רחל ברק" },
];

const init_buyin: Buyin[] = [
  { player: init_players[0], amount: 1000, date: new Date(), id: "1" },
  { player: init_players[1], amount: 1500, date: new Date(), id: "2" },
  { player: init_players[2], amount: 750, date: new Date(), id: "3" },
  { player: init_players[3], amount: 2000, date: new Date(), id: "4" },
  { player: init_players[4], amount: 1250, date: new Date(), id: "5" },
];

export const useApi = (): Api => {
  const [players, setPlayers] = useState<Player[]>(init_players);
  const [buyin, setBuyin] = useState<Buyin[]>(init_buyin);
  const [callback, setCallback] = useState<(event: Event) => void>(
    () => () => {}
  );

  const sendEvent = useCallback(
    (event: Event) => {
      try {
        callback(event);
      } catch (e) {
        console.error(e);
      }
    },
    [callback]
  );

  const getPlayers = useCallback(async () => {
    return [...players];
  }, [players]);

  const getBuyins = useCallback(async () => {
    return [...buyin];
  }, [buyin]);

  const publish = useCallback(
    async (cmd: Command) => {
      switch (cmd.type) {
        case "add-buyin": {
          const { playerId, amount } = cmd.payload;
          const player = players.find((player) => player.id === playerId);
          if (!player) {
            return { success: false };
          }
          setBuyin((prevBuyin) => [
            ...prevBuyin,
            {
              player,
              amount,
              date: new Date(),
              id: (prevBuyin.length + 1).toString(),
            },
          ]);
          sendEvent({
            type: "buyin-added",
            payload: {
              buyinId: (buyin.length + 1).toString(),
              sessionId: "1",
              playerId,
              amount,
            },
          });
          break;
        }
        case "add-player": {
          const { name } = cmd.payload;
          const id = (players.length + 1).toString();
          const player = {
            id,
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setPlayers((prevPlayers) => [...prevPlayers, player]);
          sendEvent({
            type: "player-added",
            payload: {
              playerId: id,
              name,
            },
          });
          break;
        }

        case "create-session": {
          sendEvent({
            type: "session-created",
            payload: {
              sessionId: "1",
              groupId: "1",
            },
          });
          break;
        }
      }

      return { success: true };
    },
    [buyin, players]
  );

  const subscribe = useCallback((callback: (event: Event) => void) => {
    setCallback(() => callback);
    return () => {
      setCallback(() => () => {});
    };
  }, []);

  return {
    getPlayers,
    getBuyins,
    publish,
    subscribe,
  };
};
