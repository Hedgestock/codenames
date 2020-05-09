import { Button, Typography } from "@material-ui/core";
import * as React from "react";
import { Store } from "../../Store";

const NotFound = () => {
  const { state } = React.useContext(Store);
  function find() {
    window.location.href =
      "https://www.google.com/search?q=" + window.location.href;
  }

  return (
    <div className="page">
      <div className="page-container">
        <Typography variant="h2">{state.langRes.notFound.message}</Typography>
        <Button onClick={find}>{state.langRes.notFound.find}</Button>
      </div>
    </div>
  );
};

export default NotFound;
