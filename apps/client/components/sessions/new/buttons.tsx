import { AddBuyin, AddPlayer } from "./dialogs";
import { Props } from "./types";

export const ButtonsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row gap-2 mb-2 sm:mb-0 order-2 sm:order-1">
    {children}
  </div>
);

export const Buttons = ({ addBuyin, addPlayer, players }: Props) => {
  return (
    <ButtonsLayout>
      <AddBuyin addBuyin={addBuyin} players={players} />
      <AddPlayer addPlayer={addPlayer} />
    </ButtonsLayout>
  );
};
