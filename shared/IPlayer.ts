import { Team, EPlayerStatus } from ".";


export interface IPlayer {
  team: Team;
  isSpyMaster: boolean;
  isGameMaster: boolean;
  name: string;
  socketsNo: number;
}
