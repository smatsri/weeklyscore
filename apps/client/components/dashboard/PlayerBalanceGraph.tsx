"use client";

import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

type Prop = {
  players: {
    name: string;
    balance: {
      date: string;
      balance: number;
    }[];
  }[];
};

// create color pallete with 20 colors
const pallete = [
  "#3498db",
  "#e74c3c",
  "#9b59b6",
  "#1abc9c",
  "#f1c40f",
  "#2980b9",
  "#e67e73",
  "#95a5a6",
  "#2ecc71",
  "#e2c044",
  "#8e44ad",
  "#d35400",
  "#45b3fa",
  "#ff9800",
  "#2c3e50",
  "#ff69b4",
  "#009688",
  "#4b77a8",
  "#ecf0f1",
  "#bdc3c7",
];

export default function PlayerBalanceGraph({ players }: Prop) {
  const [curPlayer, setCurPlayer] = useState(players[0]);
  const colors = useMemo(
    () =>
      players.reduce(
        (acc, player, index) => {
          acc[player.name] = pallete[index % pallete.length];
          return acc;
        },
        {} as Record<string, string>
      ),
    [players]
  );

  return (
    <Card className="min-w-[300px]">
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={curPlayer.balance}
            margin={{ top: 10, right: 10, left: -50, bottom: 0 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="linear"
              dataKey="balance"
              stroke={colors[curPlayer.name]}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          {players.map((player, index) => (
            <button
              key={index}
              type="button"
              className="px-2 py-0 text-white rounded-full text-sm"
              style={{
                backgroundColor: colors[player.name],
                border:
                  player.name === curPlayer.name ? "2px solid #000" : "none",
              }}
              onClick={() => setCurPlayer(player)}
            >
              {player.name}
            </button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
