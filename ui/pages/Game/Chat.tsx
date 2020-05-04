import {
  IconButton,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import * as React from "react";
import { Store } from "../../Store";

interface ChatProps {
  guid: string;
  inputLabel?: string;
  historyLabel?: string;
  socket: SocketIOClient.Socket;
}

const Chat = ({ inputLabel, guid, historyLabel, socket }: ChatProps) => {
  const [chat, setChat] = React.useState([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (socket) {
      socket.on("message", (messageObject) =>
        setChat((prevChat) => [messageObject, ...prevChat])
      );

      socket.on("chatInit", (chatObject) => {
        setChat(chatObject);
      });
    }
  }, [socket]);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function sendMessage() {
    const trimmed = message.trim();
    if (trimmed !== "") {
      socket.emit("message", trimmed);
    }
    setMessage("");
  }

  function handleKeyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        margin: "10px",
        flexGrow: 1,
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column-reverse",
          margin: "10px",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        {chatToText(chat)}
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <TextField
          label={inputLabel}
          multiline
          variant="outlined"
          rowsMax={4}
          fullWidth
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          value={message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary" onClick={sendMessage}>
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

function chatToText(chat) {
  return chat.map((entry, i) => (
    <Typography
      key={i}
    >{`${entry["author"]}:  ${entry["message"]}`}</Typography>
  ));
}

export default Chat;
