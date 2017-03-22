import "reflect-metadata";
import { argv } from "yargs";
import { ConnectionOptions } from "typeorm";
import { Application, ApplicationOptions } from "./lib/application";

let metadata = require("../package.json");

// Get CLI args or defaults
const HOST = argv.host || "127.0.0.1";
const PORT = argv.port || 1337;
const CONFIG = argv.config;

// Default application options suitable for development environment
// TODO Override values from JSON file provided on CLI 
let options: ApplicationOptions = {
    database: {
        driver: {
            type: "sqlite",
            storage: "database.sqlite"
        },
        entities: [
            __dirname + "/entity/*.js"
        ],
        autoSchemaSync: true
    },
    logger: {
        name: metadata.name,
        version: metadata.version,
        level: "debug"
    }
};

Application.getApp(options).then(app => {
    app.listen(PORT, HOST, () => {
        Application.logger.info(`Serving on http://${HOST}:${PORT}`);
    });
})
