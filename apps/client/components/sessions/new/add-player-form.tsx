"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewSession } from "./model";

type Props = {
  onSubmit: (playerName: string) => void;
};
export default function AddPlayerForm({ onSubmit }: Props) {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("טופס נשלח:", { playerName });
    onSubmit(playerName);
  };

  return (
    <div dir="rtl" lang="he" className="font-sans">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-md mx-auto"
      >
        <div className="space-y-2">
          <Label htmlFor="player-name">שם השחקן</Label>
          <Input
            id="player-name"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="text-right"
            placeholder="הכנס שם שחקן"
          />
        </div>

        <Button type="submit" className="w-full">
          הוסף שחקן
        </Button>
      </form>
    </div>
  );
}
