import * as express from "express";
import * as bodyParser from "body-parser";
import { HttpError, NotFound, InternalServerError } from "http-errors";
import { Express, Request, Response, NextFunction } from "express";
import { createConnection, ConnectionOptions } from "typeorm";
import * as routes from "../route" ;

/**
 * Returns an Express Application with an active database connection
 */
export function createConnectedApp(options?: ConnectionOptions): Promise<Express> {

    return createConnection(options)
        .then(connection => {

            // Express Application
            const app = express();
            app.use(bodyParser.json());

            // Apply routes from modules
            app.use(routes);

            // 404 Not Found
            app.use((req: Request, res: Response, next: NextFunction) => {
                throw new NotFound();
            });

            // 500 Server Error
            app.use((err: any, req: Request, res: Response, next: NextFunction) => {
                if (err instanceof HttpError) {
                    res.status(err.statusCode);
                    res.jsonp({ error: err });
                } else {
                    console.error(err);
                    res.status(500);
                    res.jsonp({ error: new InternalServerError() });
                }
            });

            return app;
        })
        .catch(err => {
            console.error("TypeORM Failed to Connect", err);
        });
}
