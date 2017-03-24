import "reflect-metadata";
import { argv } from "yargs";
import { Application, ApplicationOptions } from "./lib/application";

// Hostname to serve application on
const HOST = argv.host || "127.0.0.1";

// Port to serve application on
const PORT = argv.port || 1337;

// Application options
const options: ApplicationOptions = {
    connectionName: argv["connection-name"] || "file-db",
    logLevel: argv["leg-level"] || "debug",
};

// Start Application
Application.getApp(options).then(app => {
    app.listen(PORT, HOST, () => {
        Application.logger.info(`Serving on http://${HOST}:${PORT}`);
    });
}).catch(e => Application.logger.error(e));
