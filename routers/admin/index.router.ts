import { Express } from "express";
import { dashboardRouter } from "./dashboard.router";
import { systemConfig } from "../../config/system";
import { topicRouter } from "./topic.router"
import { songRouter } from "./song.router";
import { uploadRouter } from "./upload.router";
//import * as authMiddleware from "../middlewares/auth.middleware";

const mainV1Router = (app: Express): void => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(`${PATH_ADMIN}/dashboard`, dashboardRouter);

    app.use(`${PATH_ADMIN}/topics`, topicRouter);
    
    app.use(`${PATH_ADMIN}/songs`, songRouter);

    app.use(`${PATH_ADMIN}/uploads`, uploadRouter);
}

export default mainV1Router;