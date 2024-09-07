import moment from "moment";
import { getDashboardData } from "./api";

export async function getData() {
  const { allSessionTotalWinnings, getPlayerScores, getPlayerBalance } = await getDashboardData();

  const players = getPlayerScores.nodes.map(({ playerName, total }) => ({
    name: playerName,
    score: total,
  }));

  const sessions = allSessionTotalWinnings.edges.map((edge) => ({
    date: moment(edge.node.createdAt).format("DD/MM/yyyy"),
    winnings: edge.node.totalWinnings,
  }));

  const calculateBalances = (player: typeof getPlayerBalance["nodes"][0]) => {
    let balance = +player.startingBalance;
    return player.sessions.map((buyin) => {
      balance += buyin.amount;
      return { date: moment(buyin.date).format("DD/MM"), balance };
    });
  };

  const playerBalances = getPlayerBalance.nodes.map((player) => ({
    name: player.playerName,
    balance: calculateBalances(player),
  }));

  return {
    players,
    sessions,
    playerBalances,
  };
}
