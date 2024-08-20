import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv"
import * as database from "./config/database"
import Topic from "./models/topic.model";
import clientRouter from "./routers/client/index.router";
import adminRouter from "./routers/admin/index.router";
import { systemConfig } from "./config/system";
import path = require("path");
import bodyParser = require("body-parser");
import methodOverride from "method-override"

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(methodOverride('_method')) // override
app.use(express.static(`${__dirname}/public`));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use(bodyParser.urlencoded({ extended: false }))// encode chuyển đổi res.body => dữ liệu


adminRouter(app);
clientRouter(app);

app.listen(port, () => { // lắng nghe port => chạy vô hàm
    console.log(`Example app listening on port ${port}`);
})