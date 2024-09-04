export interface DashboardData {
  allSessionTotalWinnings: {
    edges: {
      node: {
        playSessionId: string;
        createdAt: string;
        totalWinnings: number;
      };
    }[];
  };
  getPlayerScores: {
    nodes: {
      playerId: string;
      playerName: string;
      total: number;
    }[];
  };
}
