import { Command, Event } from "@weeklyscore/schema";

import useWS from "../ws/ws.hook";
import { useApi } from "./api.hook";
import { Api } from "./types";

export const useSessionApi = (
  sessionId: string,
  groupId: string
): Api & { ready: boolean } => {
  const ws = useWS();
  const api = useApi(groupId, sessionId);

  const subscribe = (callback: (event: Event) => void) => {
    return ws.subscribe(callback);
  };

  const publish = async (cmd: Command) => {
    ws.publish(cmd);
    return { success: true };
  };

  return {
    getPlayers: api.getPlayers,
    getBuyins: api.getBuyins,
    publish,
    subscribe,
    ready: ws.ready,
  };
};
