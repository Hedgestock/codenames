import { IconButton, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import * as React from "react";
import { Store } from "../../Store";

interface ChatProps {
  guid: string;
  eventSource: EventSource;
  inputLabel?: string;
  historyLabel?: string;
}

const Chat = ({ inputLabel, eventSource, guid, historyLabel }: ChatProps) => {
  const { state, dispatch } = React.useContext(Store);

  const [chat, setChat] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const onInit = React.useCallback((event: MessageEvent) => {
    console.debug("init", event);
    setChat(JSON.parse(event.data));
  }, []);

  const onUpdate = React.useCallback(
    (event: MessageEvent) => {
      console.debug("update", event);
      let tmp = [...chat];
      console.debug("tmp", chat);
      tmp.push(JSON.parse(event.data));
      setChat(tmp);
    },
    [chat]
  );

  React.useEffect(() => {
    eventSource.addEventListener("chatInit", onInit);
    return () => {
      eventSource.removeEventListener("chatInit", onInit);
    };
  }, []);

  React.useEffect(() => {
    eventSource.addEventListener("chatUpdate", onUpdate);
    return () => {
      eventSource.removeEventListener("chatUpdate", onUpdate);
    };
  }, [onUpdate]);

  console.debug(chat);
  function handleChange(e) {
    setMessage(e.target.value);
  }

  function sendMessage() {
    fetch(`/chat/${guid}`, {
      method: "post",
      body: JSON.stringify({ author: state.cookie.name, message }),
      headers: {
        "Content-Type": "application/json",
      },
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
