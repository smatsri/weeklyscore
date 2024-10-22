"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewSession, Player } from "./model";

type Props = {
  players: Player[];
  onSubmit: (playerId: string, amount: number) => void;
};
const AddBuyinForm = ({ players, onSubmit }: Props) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(selectedUser, amount);
  };
  return (
    <div dir="rtl" lang="he" className="font-sans">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-md mx-auto"
      >
        <div className="space-y-2">
          <Label htmlFor="user-select">בחר משתמש</Label>
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger id="user-select" className="text-right">
              <SelectValue placeholder="בחר משתמש" />
            </SelectTrigger>
            <SelectContent>
              {players.map((player) => (
                <SelectItem
                  key={player.id}
                  value={player.id.toString()}
                  className="text-right"
                >
                  {player.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">סכום</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="50"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="text-right"
            placeholder="הכנס סכום"
          />
        </div>

        <Button type="submit" className="w-full">
          שלח
        </Button>
      </form>
    </div>
  );
};

export default AddBuyinForm;
