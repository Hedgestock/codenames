import express from "express";
import { eventSources, resources } from "../sse";

const router = express.Router();

/* GET chat home page. */
router.get("/", function (req, res) {
  res.send({ route: "chat home" });
});

router.post("/:guid", (req, res) => {
  const { guid } = req.params;

  if (eventSources[guid] && req.body) {
    const data = [req.body.author, req.body.message];
    console.log(data);
    console.log(resources[guid]);
    resources[guid].chat.push(data);
    eventSources[guid].send(data, "chatUpdate");
  }
  res.send();
});

export default router;
