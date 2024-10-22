import AddBuyinForm from "@/components/sessions/new/add-buyin-form";
import AddPlayerForm from "@/components/sessions/new/add-player-form";
import Dialog from "./dialog";
import { useCallback, useState } from "react";
import { Props } from "./types";

export const AddBuyin = ({
  addBuyin,
  players,
}: Pick<Props, "addBuyin" | "players">) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = useCallback(
    async (playerId: string, amount: number) => {
      const success = await addBuyin(playerId, amount);
      if (success) setDialogOpen(false);
    },
    [addBuyin]
  );
  return (
    <Dialog
      buttonText="הוסף BUYIN"
      title="הוסף BUYIN"
      buttonVariant="outline"
      open={dialogOpen}
      setOpen={setDialogOpen}
    >
      <AddBuyinForm players={players} onSubmit={handleSubmit} />
    </Dialog>
  );
};

export const AddPlayer = ({ addPlayer }: Pick<Props, "addPlayer">) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSubmit = useCallback(
    async (name: string) => {
      const success = await addPlayer(name);
      if (success) setDialogOpen(false);
    },
    [addPlayer]
  );
  return (
    <Dialog
      buttonText="הוסף שחקן"
      title="הוסף שחקן"
      buttonVariant="outline"
      open={dialogOpen}
      setOpen={setDialogOpen}
    >
      <AddPlayerForm onSubmit={handleSubmit} />
    </Dialog>
  );
};
