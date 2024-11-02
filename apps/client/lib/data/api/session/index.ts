import client from "../apollo-client";
import {
  GroupPlayersQuery,
  GroupPlayersResponse,
  SessionBuyinResponse,
  SessionBuyinsQuery,
} from "./query";

export const getBuyins = async (sessionId: string) => {
  const res = await client.query<SessionBuyinResponse>({
    query: SessionBuyinsQuery,
    variables: {
      sessionId,
    },
  });

  if (res.errors) {
    throw new Error("Error fetching buyins");
  }

  return res.data.getSessionBuyins.nodes;
};

export const getPlayers = async (groupid: string) => {
  const res = await client.query<GroupPlayersResponse>({
    query: GroupPlayersQuery,
    variables: {
      groupid,
    },
  });

  if (res.errors) {
    throw new Error("Error fetching players");
  }

  return res.data.getGroupPlayers.nodes;
};
