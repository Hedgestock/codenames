import * as React from "react";
import { Badge, Button } from "@material-ui/core";

interface GameCardProps extends React.ComponentProps<"div"> {
  column: number;
  row: number;
  style: React.CSSProperties;
  votes?: number;
  onClick: () => void;
}

const GameCard = ({
  column,
  row,
  style,
  children,
  votes,
  onClick,
}: GameCardProps) => {
  return (
    <Badge badgeContent={votes} color="primary">
      <Button
        className="game-card"
        variant="contained"
        style={{ flexGrow: 1, gridColumn: column, gridRow: row, ...style }}
        onClick={onClick}
      >
        {children}
      </Button>
    </Badge>
  );
};

export default GameCard;
