import moment from "moment";
import { getDashboardData } from "./api";

export async function getData() {
  const { allSessionTotalWinnings, getPlayerScores } = await getDashboardData();

  const players = getPlayerScores.nodes.map(({ playerName, total }) => ({
    name: playerName,
    score: total,
  }));

  const sessions = allSessionTotalWinnings.edges.map((edge) => ({
    date: moment(edge.node.createdAt).format("DD/MM/yyyy"),
    winnings: edge.node.totalWinnings,
  }));

  return {
    players,
    sessions,
  };
}
