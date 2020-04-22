import { IconButton, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import * as React from "react";
import { Store } from "../../Store";
import io from "socket.io-client";

interface ChatProps {
  guid: string;
  inputLabel?: string;
  historyLabel?: string;
}

const Chat = ({ inputLabel, guid, historyLabel }: ChatProps) => {
  const { state, dispatch } = React.useContext(Store);

  const [chat, setChat] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    setSocket(
      // io('/my-namespace')
      io("/my-namespace", {
        path: "/ws",
      })
    );
    return () => {
      socket.close();
    };
  }, []);

  console.debug(chat);
  function handleChange(e) {
    setMessage(e.target.value);
  }

  function sendMessage() {
    socket.emit("message", {
      author: state.cookie.name,
      message: message.trim(),
    });
    setMessage("");
  }

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
          onChange={handleChange}
          value={message}
        />
        <IconButton color="primary" onClick={sendMessage}>
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
