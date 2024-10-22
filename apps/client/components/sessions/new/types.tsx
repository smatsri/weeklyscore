import { NewSession } from "./model";

export type Props = {
  players: NewSession["players"];
  addBuyin: NewSession["addBuyin"];
  addPlayer: NewSession["addPlayer"];
};
