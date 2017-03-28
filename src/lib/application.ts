import * as express from "express";
import * as bodyParser from "body-parser";
import * as typeorm from "typeorm";
import * as bunyan from "bunyan";
import { join } from "path";
import { HttpError, NotFound, InternalServerError } from "http-errors";
import { Express, Request, Response, NextFunction } from "express";
import * as routes from "../route";

export interface ApplicationOptions {

    // Database connection name specified in ormconfig.json
    connectionName: string;

    // Logger level
    logLevel: string | number;
}

export class Application {

    // Singleton application
    private static _app: Express;

    // Logger interface
    public static logger: bunyan;

    // DB Connection Name
    public static connectionName: string;

    /**
     * Returns an Express Application with an active database connection
     * @param options 
     */
    public static getApp(options: ApplicationOptions): Promise<Express> {

        if (this._app) return Promise.resolve(this._app);

        // Project metadata
        let metadata = require(join("..", "..", "package.json"));

        // Create logger instance
        this.logger = bunyan.createLogger({
            name: metadata.name,
            version: metadata.version,
            level: options.logLevel,
        });

        // Load TypeORM config for connection
        const ormConfig = require(join("..", "..", "ormconfig.json")).find(con => con.name === options.connectionName);
        if(!ormConfig) throw new Error(`No ORM configuration found for connection named '${options.connectionName}'`);

        // Assign DB logger
        ormConfig.logging = Object.assign(ormConfig.logging, {
            logger: (level, msg) => this.logger.debug(msg)
        })

        // Create DB Connection
        return typeorm.createConnection(ormConfig)
            .then(connection => {

                // Expose connection name in Application
                this.connectionName = options.connectionName;

                // Express Application
                this._app = express();
                this._app.use(bodyParser.json());

                // Apply routes from modules
                this._app.use(routes);

                // 404 Not Found
                this._app.use((req: Request, res: Response, next: NextFunction) => {
                    if (!res.headersSent) throw new NotFound();
                    next();
                });

                // 500 Server Error
                this._app.use((err: any, req: Request, res: Response, next: NextFunction) => {
                    if (!res.headersSent) {
                        if (!(err instanceof HttpError)) {
                            this.logger.error(err);
                            err = new InternalServerError();
                        }
                        res.status(err.statusCode);
                        res.jsonp({ error: err });
                    }
                    next();
                });

                // Logger Middleware
                this._app.use((req: Request, res: Response) => {
                    this.logger.info(`${res.statusCode} ${req.method} ${req.url}`);
                });

                return this._app;
            })
            .catch(err => {
                this.logger.error(err);
            });
    }
}
