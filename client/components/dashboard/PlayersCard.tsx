"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

type Props = {
  players: { name: string; score: number }[];
};

export default function PlayersCard({ players = [] }: Props) {
  const [open, setOpen] = useState(false);
  const playersToShow = useMemo(
    () => (!open ? players.slice(0, 3) : players),
    [players, open]
  );

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>שחקנים מובילים</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3">
          {playersToShow.map((player) => (
            <li key={player.name} className="flex items-center justify-between">
              <span>{player.name}</span>
              <span>₪{player.score}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" onClick={() => setOpen(!open)}>
          {open ? "הצג פחות" : "הצג את כל השחקנים"}
        </Button>
      </CardFooter>
    </Card>
  );
}
