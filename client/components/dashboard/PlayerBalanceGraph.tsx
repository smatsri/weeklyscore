import moment from "moment";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const playerData = {
  players: [
    {
      playerName: "אבי",
      startingBalance: 3242,
      sessions: [
        {
          date: "2023-01-05T22:00:00",
          amount: -90,
        },
        {
          date: "2023-01-12T22:00:00",
          amount: -140,
        },
        {
          date: "2023-01-19T22:00:00",
          amount: 246,
        },
        {
          date: "2023-01-26T22:00:00",
          amount: 218,
        },
        {
          date: "2023-02-02T22:00:00",
          amount: 32,
        },
        {
          date: "2023-02-16T22:00:00",
          amount: 134,
        },
        {
          date: "2023-02-23T22:00:00",
          amount: 776,
        },
        {
          date: "2023-03-02T22:00:00",
          amount: 550,
        },
        {
          date: "2023-03-30T22:00:00",
          amount: 882,
        },
        {
          date: "2023-04-06T22:00:00",
          amount: -500,
        },
        {
          date: "2023-04-13T22:00:00",
          amount: -50,
        },
        {
          date: "2023-04-20T22:00:00",
          amount: 391,
        },
        {
          date: "2023-05-04T22:00:00",
          amount: -200,
        },
        {
          date: "2023-05-11T22:00:00",
          amount: 994,
        },
        {
          date: "2023-05-18T22:00:00",
          amount: 353,
        },
        {
          date: "2023-05-25T22:00:00",
          amount: 522,
        },
        {
          date: "2023-06-01T22:00:00",
          amount: -50,
        },
        {
          date: "2023-06-08T22:00:00",
          amount: -176,
        },
        {
          date: "2023-06-15T22:00:00",
          amount: 135,
        },
        {
          date: "2023-06-22T22:00:00",
          amount: -400,
        },
        {
          date: "2023-06-29T22:00:00",
          amount: -442,
        },
        {
          date: "2023-07-13T22:00:00",
          amount: 299,
        },
        {
          date: "2023-07-20T22:00:00",
          amount: 309,
        },
        {
          date: "2023-07-27T22:00:00",
          amount: -300,
        },
        {
          date: "2023-08-03T22:00:00",
          amount: -499,
        },
        {
          date: "2023-08-17T22:00:00",
          amount: -200,
        },
        {
          date: "2023-08-31T22:00:00",
          amount: -200,
        },
        {
          date: "2023-09-14T22:00:00",
          amount: -151,
        },
        {
          date: "2023-09-21T22:00:00",
          amount: -50,
        },
        {
          date: "2023-09-28T22:00:00",
          amount: 256,
        },
        {
          date: "2023-10-12T22:00:00",
          amount: 102,
        },
        {
          date: "2023-10-19T22:00:00",
          amount: 904,
        },
        {
          date: "2023-10-26T22:00:00",
          amount: -30,
        },
        {
          date: "2023-11-09T22:00:00",
          amount: 770,
        },
        {
          date: "2023-11-16T22:00:00",
          amount: -200,
        },
        {
          date: "2023-11-23T22:00:00",
          amount: -200,
        },
        {
          date: "2023-11-30T22:00:00",
          amount: -171,
        },
        {
          date: "2023-12-07T22:00:00",
          amount: 535,
        },
        {
          date: "2023-12-14T22:00:00",
          amount: -50,
        },
        {
          date: "2023-12-21T22:00:00",
          amount: -200,
        },
        {
          date: "2023-12-28T22:00:00",
          amount: 211,
        },
        {
          date: "2024-01-04T22:00:00",
          amount: -350,
        },
        {
          date: "2024-01-11T22:00:00",
          amount: -50,
        },
        {
          date: "2024-01-18T22:00:00",
          amount: -350,
        },
        {
          date: "2024-01-25T22:00:00",
          amount: -350,
        },
        {
          date: "2024-02-01T22:00:00",
          amount: -52,
        },
        {
          date: "2024-02-08T22:00:00",
          amount: -42,
        },
        {
          date: "2024-02-22T22:00:00",
          amount: -300,
        },
        {
          date: "2024-02-29T22:00:00",
          amount: 129,
        },
        {
          date: "2024-03-07T22:00:00",
          amount: -40,
        },
        {
          date: "2024-03-14T22:00:00",
          amount: 338,
        },
        {
          date: "2024-04-04T22:00:00",
          amount: -50,
        },
        {
          date: "2024-04-11T22:00:00",
          amount: -200,
        },
        {
          date: "2024-04-18T22:00:00",
          amount: -342,
        },
        {
          date: "2024-04-25T22:00:00",
          amount: -99,
        },
        {
          date: "2024-05-16T22:00:00",
          amount: -97,
        },
        {
          date: "2024-05-23T22:00:00",
          amount: -550,
        },
        {
          date: "2024-05-30T22:00:00",
          amount: -200,
        },
        {
          date: "2024-06-06T22:00:00",
          amount: 878,
        },
        {
          date: "2024-06-13T22:00:00",
          amount: -50,
        },
        {
          date: "2024-06-20T22:00:00",
          amount: 901,
        },
        {
          date: "2024-07-11T22:00:00",
          amount: -150,
        },
        {
          date: "2024-07-25T22:00:00",
          amount: -208,
        },
        {
          date: "2024-08-08T22:00:00",
          amount: -50,
        },
        {
          date: "2024-08-15T22:00:00",
          amount: -350,
        },
        {
          date: "2024-08-22T22:00:00",
          amount: 947,
        },
        {
          date: "2024-08-29T22:00:00",
          amount: -50,
        },
        {
          date: "2024-09-19T22:00:00",
          amount: -200,
        },
        {
          date: "2024-10-03T22:00:00",
          amount: -230,
        },
        {
          date: "2024-10-10T22:00:00",
          amount: -34,
        },
        {
          date: "2024-10-17T22:00:00",
          amount: -106,
        },
        {
          date: "2024-10-31T22:00:00",
          amount: -151,
        },
        {
          date: "2024-11-07T22:00:00",
          amount: 237,
        },
        {
          date: "2024-11-14T22:00:00",
          amount: 78,
        },
        {
          date: "2024-11-28T22:00:00",
          amount: 325,
        },
        {
          date: "2024-12-05T22:00:00",
          amount: -126,
        },
        {
          date: "2024-12-19T22:00:00",
          amount: -350,
        },
        {
          date: "2024-12-26T22:00:00",
          amount: 349,
        },
      ],
    },
  ],
};

type PlayerData = (typeof playerData)["players"][0];

const calculateBalances = (player: PlayerData) => {
  let balance = +player.startingBalance;
  return player.sessions.map((buyin) => {
    balance += buyin.amount;
    return { date: moment(buyin.date).format("MM/DD"), balance };
  });
};

const data = calculateBalances(playerData.players[0]);

console.log(data);

export default function PlayerBalanceGraph() {
  return (
    <ResponsiveContainer width="100%" height={400} minWidth={600}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="balance" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
