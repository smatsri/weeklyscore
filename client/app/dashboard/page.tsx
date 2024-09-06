import LatestSessionsCard from "@/components/dashboard/LatestSessionsCard";
import PlayersCard from "@/components/dashboard/PlayersCard";
import { getData } from "@/lib/data";

const Dashboard = async () => {
  const { players, sessions } = await getData();

  return (
    <main>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">דאשבורד</h1>
        <div className="w-full max-w-md">
          <PlayersCard players={players} show={4} />
        </div>
        <div className="w-full max-w-md">
          <LatestSessionsCard sessions={sessions} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
