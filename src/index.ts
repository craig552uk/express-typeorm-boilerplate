import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { Application } from "./lib/application";

// TODO Get from CLI
const HOST = "127.0.0.1";
const PORT = 1337;

// Database connection options
// TODO move to configuration loader library
let options: ConnectionOptions = {
    driver: {
        type: "sqlite",
        storage: "database.sqlite"
    },
    entities: [
        __dirname + "/entity/*.js"
    ],
    autoSchemaSync: true
};

Application.getApp(options).then(app => {
    app.listen(PORT, HOST, () => {
        console.log(`Serving on http://${HOST}:${PORT}`);
    });
})
