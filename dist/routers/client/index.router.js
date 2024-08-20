"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const song_router_1 = require("./song.router");
const topic_router_1 = require("./topic.router");
const search_router_1 = require("./search.router");
const favoriteSong_router_1 = require("./favoriteSong.router");
const mainV1Router = (app) => {
    app.use(`/topics`, topic_router_1.topicRouter);
    app.use(`/songs`, song_router_1.songRouter);
    app.use(`/favorite-songs`, favoriteSong_router_1.favoriteSongRouter);
    app.use(`/search`, search_router_1.searchRouter);
};
exports.default = mainV1Router;
