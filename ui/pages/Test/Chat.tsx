import * as React from "react";
import { TextField, InputBase, Button, IconButton } from "@material-ui/core";
import { Search, Send } from "@material-ui/icons";

interface ChatProps {
  inputLabel?: string;
  historyLabel?: string;
}

const Chat = ({ inputLabel, historyLabel }: ChatProps) => {
  const chat = [
    ["test", "salut"],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    ["test2", "salut"],
    [
      "test",
      "salut ceci est une longue phrase pour tester l'ui et les retours à la ligne, j'espère que ça va marcher...",
    ],
    ["test", "salut"],
    ["test2", "salut"],
  ];

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        margin: "10px",
        flexGrow: 1,
        maxHeight: "90%",
        minHeight: "90%",
      }}
    >
      <TextField
        label={historyLabel}
        multiline
        variant="outlined"
        rows={30}
        rowsMax={30}
        disabled
        value={chatToText(chat)}
      />
      <br />
      <div style={{ display: "flex" }}>
        <TextField
          label={inputLabel}
          multiline
          variant="outlined"
          rowsMax={4}
          style={{ flexGrow: 1 }}
        />
        <IconButton color="primary">
          <Send />
        </IconButton>
      </div>
    </div>
  );
};

function chatToText(chat: string[][]): string {
  let res = "";
  chat.map((entry) => (res += ` ${entry[0]}:  ${entry[1]}\n\n`));
  return res;
}

export default Chat;
