import {
  IconButton,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import * as React from "react";
import { Store } from "../../Store";
import ISocketConnectedProps from "../../shared/ISocketConnectedProps";

const Chat = ({ socket }: ISocketConnectedProps) => {
  const { state } = React.useContext(Store);

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
        height: "100%",
        maxWidth: "500px",
      }}
    >
      <div className="history--window">{chatToText(chat)}</div>
      <br />
      <div style={{ display: "flex" }}>
        <TextField
          label={state.langRes.chat.input}
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
