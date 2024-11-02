import { gql } from "@apollo/client";

export const SessionBuyinsQuery = gql`
  query SessionBuyins($sessionId: UUID) {
    getSessionBuyins(sessionId: $sessionId) {
      nodes {
        id
        date
        amount
        playerId
        playerName
      }
    }
  }
`;

export type SessionBuyin = {
  id: string;
  date: string;
  amount: number;
  playerId: string;
  playerName: string;
};

export type SessionBuyinResponse = {
  getSessionBuyins: {
    nodes: SessionBuyin[];
  };
};

export const GroupPlayersQuery = gql`
  query GroupPlayers($groupid: UUID) {
    getGroupPlayers(groupid: $groupid) {
      nodes {
        id
        name
      }
    }
  }
`;

export type GroupPlayer = {
  id: string;
  name: string;
};

export type GroupPlayersResponse = {
  getGroupPlayers: {
    nodes: GroupPlayer[];
  };
};
