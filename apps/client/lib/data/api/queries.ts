import { gql } from "@apollo/client";

export const DASHBOARD_DATA_QUERY = gql`
  query DashboarData($numSessions: Int, $fromDate: Date) {
    allSessionTotalWinnings(first: $numSessions, orderBy: CREATED_AT_DESC) {
      edges {
        node {
          playSessionId
          createdAt
          totalWinnings
        }
      }
    }
    getPlayerScores {
      nodes {
        playerId
        playerName
        total
      }
    }

    getPlayerBalance(fromDate: $fromDate) {
      nodes {
        playerName
        startingBalance
        sessions
      }
    }
  }
`;
