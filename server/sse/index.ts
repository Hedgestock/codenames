import express from "express";
import sse from "express-sse";

export class Resource {
  constructor() {
    this.game = {};
    this.chat = [];
    this.history = {};
  }
  game: any;
  chat: string[][];
  history: any;
}

const router = express.Router();

export let eventSources = {};
export let resources = {};

router.get("/:guid", (req, res) => {
  const { guid } = req.params;
  if (!eventSources[guid]) {
    console.debug("Creating sse " + guid);
    eventSources[guid] = new sse();

    console.debug("Creating resource " + guid);
    resources[guid] = new Resource();
  }

  console.debug("Initializing sse " + guid);
  eventSources[guid].init(req, res);

  eventSources[guid].send(resources[guid].chat, "chatInit");

});



export default router;
