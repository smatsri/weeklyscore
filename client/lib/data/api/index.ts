import { DashboardData } from "../types";
import client from "./apollo-client";
import { DASHBOARD_DATA_QUERY } from "./queries";

export async function getDashboardData() {
  const res = await client.query<DashboardData>({
    query: DASHBOARD_DATA_QUERY,
    variables: { numSessions: 4 },
  });

  return res.data;
}
