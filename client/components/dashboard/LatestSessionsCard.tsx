import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Props = {
  sessions: { date: string; winnings: number }[];
};

export default function LatestSessionsCard({ sessions = [] }: Props) {
  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <h2 className="border-hidden">שסנים אחרונים</h2>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3">
          {sessions.map((session) => (
            <li
              key={session.date}
              className="flex items-center justify-between"
            >
              <span>{session.date}</span>
              <span>₪{session.winnings}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline">הצג הכל</Button>
      </CardFooter>
    </Card>
  );
}
