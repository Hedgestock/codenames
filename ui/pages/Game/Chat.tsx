import { IconButton, TextField } from "@material-ui/core";
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
  const { state, dispatch } = React.useContext(Store);

  const [chat, setChat] = React.useState([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (socket) {
      socket.on("message", (messageObject) =>
        setChat((prevChat) => [...prevChat, messageObject])
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
    socket.emit("message", message.trim());
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
  chat.map((entry) => (res += ` ${entry["author"]}:  ${entry["message"]}\n\n`));
  return res;
}

export default Chat;
