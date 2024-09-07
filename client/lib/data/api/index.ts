import moment from "moment";
import { DashboardData } from "../types";
import client from "./apollo-client";
import { DASHBOARD_DATA_QUERY } from "./queries";

export async function getDashboardData() {
  try {
    const res = await client.query<DashboardData>({
      query: DASHBOARD_DATA_QUERY,
      variables: { numSessions: 4, fromDate: moment().subtract(5, "months").format("YYYY-MM-DD") },
    });

    return res.data;
  } catch (error) {
    console.error(error)
    throw new Error("Error fetching dashboard data");
  }

}
