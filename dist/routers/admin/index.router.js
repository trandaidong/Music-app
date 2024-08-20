"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_router_1 = require("./dashboard.router");
const system_1 = require("../../config/system");
const topic_router_1 = require("./topic.router");
const song_router_1 = require("./song.router");
const upload_router_1 = require("./upload.router");
const mainV1Router = (app) => {
    const PATH_ADMIN = system_1.systemConfig.prefixAdmin;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_router_1.dashboardRouter);
    app.use(`${PATH_ADMIN}/topics`, topic_router_1.topicRouter);
    app.use(`${PATH_ADMIN}/songs`, song_router_1.songRouter);
    app.use(`${PATH_ADMIN}/uploads`, upload_router_1.uploadRouter);
};
exports.default = mainV1Router;
