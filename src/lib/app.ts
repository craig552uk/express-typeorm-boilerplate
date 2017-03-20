import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, Express } from "express";
import { createConnection, ConnectionOptions } from "typeorm";
import * as product from "../controller/product";

/**
 * Returns an Express Application with an active database connection
 */
export function createConnectedApp(options?: ConnectionOptions): Promise<Express> {

    return createConnection(options)
        .then(async connection => {

            const app = express();
            app.use(bodyParser.json());

            // TODO Apply routes from module
            app.get("/", (req: Request, res: Response) => {
                res.jsonp({ msg: "Hello World" });
            });

            app.get("/products", async (req: Request, res: Response) => {
                const products = await product.getAll();
                res.jsonp({ products: products });
            })

            return app;
        })
        .catch(err => {
            console.error("TypeORM Failed to Connect", err);
        });
}
