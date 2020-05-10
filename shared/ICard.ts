import { Team } from ".";

export interface ICard {
  word: string;
  color: undefined | Team | "white" | "black";
  revealed: boolean;
}
