import * as express from "express";
import * as bodyParser from "body-parser";
import * as typeorm from "typeorm";
import * as bunyan from "bunyan";
import { HttpError, NotFound, InternalServerError } from "http-errors";
import { Express, Request, Response, NextFunction } from "express";
import * as routes from "../route";

export interface ApplicationOptions {
    database: typeorm.ConnectionOptions;
    logger: bunyan.LoggerOptions;
}

export class Application {

    // Singleton application
    private static _app: Express;
    public static logger: bunyan;

    /**
     * Returns an Express Application with an active database connection
     * @param options 
     */
    public static getApp(options: ApplicationOptions): Promise<Express> {

        if (this._app) return Promise.resolve(this._app);

        // Create logger instance
        this.logger = bunyan.createLogger(options.logger);

        return typeorm.createConnection(options.database)
            .then(connection => {

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
