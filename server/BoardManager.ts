import words_list from "./tools/words_list";
import { ICard, Team } from "../shared/interfaces";

export default class {
  constructor(first: Team = "blue") {
    this.first = first;
    this.board = this.initBoard();
  }

  private first: Team;
  private board: ICard[];

  private initBoard(remainingFirst = 9, remainingSecond = 8): ICard[] {
    const second: "blue" | "red" = this.first === "blue" ? "red" : "blue";
    let board: ICard[] = [];
    for (let i = 0; i < 25; i++) {
      board.push({
        word: words_list[Math.floor(Math.random() * words_list.length)],
        revealed: false,
        color: "white",
      });
    }

    let index = Math.floor(Math.random() * board.length);
    board[index].color = "black";

    while (remainingFirst) {
      index = Math.floor(Math.random() * board.length);
      if (board[index].color === "white") {
        board[index].color = this.first;
        remainingFirst--;
      }
    }

    while (remainingSecond) {
      index = Math.floor(Math.random() * board.length);
      if (board[index].color === "white") {
        board[index].color = second;
        remainingSecond--;
      }
    }

    return board;
  }

  get spyBoard(): ICard[] {
    return this.board;
  }

  get playerBoard(): ICard[] {
    return this.board.map((c) => {
      if (!c.revealed) {
        return { ...c, color: undefined };
      }
      return c;
    });
  }

  revealCard(pos: number): ICard {
    if (this.board[pos] && !this.board[pos].revealed) {
      this.board[pos].revealed = true;
      return this.board[pos];
    }
    return null;
  }
}
