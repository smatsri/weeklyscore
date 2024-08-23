import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function PlayersCard() {
  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>שחקנים מובילים</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span>שי</span>
            <span>₪250.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span>אבי</span>
            <span>₪200.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span>אלי</span>
            <span>₪150.00</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>הצג הכל</Button>
      </CardFooter>
    </Card>
  );
}
