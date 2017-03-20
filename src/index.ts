import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { createConnectedApp } from "./lib/app";
import { Product } from "./entity/Product";

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

createConnectedApp(options).then(app => {
    app.listen(PORT, HOST, () => {
        console.log(`Serving on http://${HOST}:${PORT}`);
    });
})
