import words_list from "./tools/words_list";
import { ICard, Team } from "../shared";

export default class {
  constructor(first: Team = "blue") {
    this._first = first;
    this._second = first === "blue" ? "red" : "blue";
    this.initBoard();
  }

  private _first: Team;
  private _second: Team;
  private _board: ICard[];
  private _remainingFirst: number;
  private _remainingSecond: number;

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

  getRemainingCards(team: Team) {
    if (team == this._first) {
      return this._remainingFirst;
    }
    return this._remainingSecond;
  }

  initBoard() {
    let remainingFirst = (this._remainingFirst = 9);
    let remainingSecond = (this._remainingSecond = 8);
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
        this._board[index].color = this._second;
        remainingSecond--;
      }
    }
  }

  revealCard(pos: number): ICard {
    const card = this._board[pos];
    if (card && !card.revealed) {
      card.revealed = true;
      if (card.color == this._first )
      {
        this._remainingFirst--;
      } else if (card.color == this._second) {
        this._remainingSecond--;
      }
      return this._board[pos];
    }
    return undefined;
  }
}
