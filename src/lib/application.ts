import * as express from "express";
import * as bodyParser from "body-parser";
import { HttpError, NotFound, InternalServerError } from "http-errors";
import { Express, Request, Response, NextFunction } from "express";
import { createConnection, ConnectionOptions } from "typeorm";
import * as routes from "../route";


export class Application {

    // Singleton application
    private static _app: Express;

    /**
     * Returns an Express Application with an active database connection
     */
    public static getApp(options?: ConnectionOptions): Promise<Express> {

        if (this._app) return Promise.resolve(this._app);

        return createConnection(options)
            .then(connection => {

                // Express Application
                this._app = express();
                this._app.use(bodyParser.json());

                // Apply routes from modules
                this._app.use(routes);

                // 404 Not Found
                this._app.use((req: Request, res: Response, next: NextFunction) => {
                    throw new NotFound();
                });

                // 500 Server Error
                this._app.use((err: any, req: Request, res: Response, next: NextFunction) => {
                    if (err instanceof HttpError) {
                        res.status(err.statusCode);
                        res.jsonp({ error: err });
                    } else {
                        console.error(err);
                        res.status(500);
                        res.jsonp({ error: new InternalServerError() });
                    }
                });

                return this._app;
            })
            .catch(err => {
                console.error("TypeORM Failed to Connect", err);
            });
    }
}
