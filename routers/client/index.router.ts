import { Express } from "express";
import { songRouter } from "./song.router";
import { topicRouter } from "./topic.router";
import {searchRouter } from "./search.router"

import { favoriteSongRouter } from "./favoriteSong.router"
//import * as authMiddleware from "../middlewares/auth.middleware";

const mainV1Router = (app: Express): void => {
    app.use(`/topics`, topicRouter);

    app.use(`/songs`, songRouter);

    app.use(`/favorite-songs`, favoriteSongRouter);

    app.use(`/search`, searchRouter);
}

export default mainV1Router;