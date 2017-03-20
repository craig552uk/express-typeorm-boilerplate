import * as express from "express";
import * as bodyParser from "body-parser";

export const app = express();
app.use(bodyParser.json());