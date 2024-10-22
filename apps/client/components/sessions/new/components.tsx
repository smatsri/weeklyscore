import AddBuyinForm from "@/components/sessions/new/add-buyin-form";
import AddPlayerForm from "@/components/sessions/new/add-player-form";
import Dialog from "./dialog";
import { NewSession } from "./model";
import { useCallback, useState } from "react";

export const ButtonsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row gap-2 mb-2 sm:mb-0 order-2 sm:order-1">
    {children}
  </div>
);

type Props = {
  players: NewSession["players"];
  addBuyin: NewSession["addBuyin"];
  addPlayer: NewSession["addPlayer"];
};

const AddBuyin = ({
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

const AddPlayer = ({ addPlayer }: Pick<Props, "addPlayer">) => {
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

export const Buttons = ({ addBuyin, addPlayer, players }: Props) => {
  return (
    <ButtonsLayout>
      <AddBuyin addBuyin={addBuyin} players={players} />
      <AddPlayer addPlayer={addPlayer} />
    </ButtonsLayout>
  );
};

export const Title = ({ title }: { title: string }) => (
  <h1 className="text-3xl font-bold mb-6 text-right">{title}</h1>
);
export const Main = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-6">{children}</div>
);

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="font-sans container mx-auto px-4 py-8">{children}</div>
);
