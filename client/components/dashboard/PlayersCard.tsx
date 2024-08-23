import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Props = {
  players: { name: string; score: number }[];
};

export default function PlayersCard({ players = [] }: Props) {
  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>שחקנים מובילים</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3">
          {players.map((player) => (
            <li key={player.name} className="flex items-center justify-between">
              <span>{player.name}</span>
              <span>₪{player.score}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>הצג הכל</Button>
      </CardFooter>
    </Card>
  );
}
