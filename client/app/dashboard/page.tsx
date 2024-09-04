import LatestSessionsCard from "@/components/dashboard/LatestSessionsCard";
import PlayersCard from "@/components/dashboard/PlayersCard";
import client from "@/lib/data/apollo-client";
import { DASHBOARD_DATA_QUERY } from "@/lib/data/queries";
import { DashboardData } from "@/lib/data/types";
import moment from "moment";

const Dashboard = async () => {
  const res = await client.query<DashboardData>({
    query: DASHBOARD_DATA_QUERY,
    variables: { numSessions: 10 },
  });

  const players = res.data.getPlayerScores.nodes.map(
    ({ playerName, total }) => ({
      name: playerName,
      score: total,
    })
  );

  const sessions = res.data.allSessionTotalWinnings.edges.map((edge) => ({
    date: moment(edge.node.createdAt).format("DD/MM/yyyy"),
    winnings: edge.node.totalWinnings,
  }));

  return (
    <main>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">דאשבורד</h1>
        <div className="w-full max-w-md">
          <PlayersCard players={players} />
        </div>
        <div className="w-full max-w-md">
          <LatestSessionsCard sessions={sessions} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
