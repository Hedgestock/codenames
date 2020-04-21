import * as React from "react";
import { Badge, Button } from "@material-ui/core";

interface CardProps extends React.ComponentProps<"div"> {
  column: number;
  row: number;
  style: React.CSSProperties;
  votes?: number;
}

const Card = ({ column, row, style, children, votes }: CardProps) => {
  return (
    <Badge badgeContent={votes} color="primary">
      <Button
        className="game-card"
        variant="contained"
        style={{ flexGrow: 1, gridColumn: column, gridRow: row, ...style }}
      >
        {children}
      </Button>
    </Badge>
  );
};

export default Card;
