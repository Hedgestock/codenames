import words_list from "./tools/words_list";
import { ICard, Team } from "../shared";

export default class {
  constructor(first: Team = "blue") {
    this._first = first;
    this.initBoard();
  }

  private _first: Team;
  private _board: ICard[];

  set first(value: Team) {
    this._first = value;
  }

  get spyBoard(): ICard[] {
    return this._board;
  }

  get playerBoard(): ICard[] {
    return this._board.map((c) => {
      if (!c.revealed) {
        return { ...c, color: undefined };
      }
      return c;
    });
  }

  initBoard(remainingFirst = 9, remainingSecond = 8) {
    const second: "blue" | "red" = this._first === "blue" ? "red" : "blue";
    this._board = [];
    for (let i = 0; i < 25; i++) {
      this._board.push({
        word: words_list[Math.floor(Math.random() * words_list.length)],
        revealed: false,
        color: "white",
      });
    }

    let index = Math.floor(Math.random() * this._board.length);
    this._board[index].color = "black";

    while (remainingFirst) {
      index = Math.floor(Math.random() * this._board.length);
      if (this._board[index].color === "white") {
        this._board[index].color = this._first;
        remainingFirst--;
      }
    }

    while (remainingSecond) {
      index = Math.floor(Math.random() * this._board.length);
      if (this._board[index].color === "white") {
        this._board[index].color = second;
        remainingSecond--;
      }
    }
  }

  revealCard(pos: number): ICard {
    if (this._board[pos] && !this._board[pos].revealed) {
      this._board[pos].revealed = true;
      return this._board[pos];
    }
    return undefined;
  }
}
