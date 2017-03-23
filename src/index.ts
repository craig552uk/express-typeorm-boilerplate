import "reflect-metadata";
import * as merge from "deepmerge";
import { join } from "path";
import { argv } from "yargs";
import { ConnectionOptions } from "typeorm";
import { Application, ApplicationOptions } from "./lib/application";

let metadata = require(join("..","package.json"));

// Default application options suitable for development environment
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

try {
    // Override values from JSON file provided on CLI 
    options = merge(options, require(join("..", argv.config)));
} catch (e) { }

// Get CLI args or defaults
const HOST = argv.host || "127.0.0.1";
const PORT = argv.port || 1337;

// Start Application
Application.getApp(options).then(app => {
    app.listen(PORT, HOST, () => {
        Application.logger.info(`Serving on http://${HOST}:${PORT}`);
    });
});
