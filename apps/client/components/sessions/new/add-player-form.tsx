"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddPlayerForm() {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("טופס נשלח:", { playerName });
    // Here you would typically send this data to an API
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
