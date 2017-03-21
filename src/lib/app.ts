import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, Express } from "express";
import { createConnection, ConnectionOptions } from "typeorm";
import { ProductController } from "../controller/product";

/**
 * Returns an Express Application with an active database connection
 */
export function createConnectedApp(options?: ConnectionOptions): Promise<Express> {

    return createConnection(options)
        .then(async connection => {

            // Controllers //
            const products = ProductController.getInstance();

            // Express Application
            const app = express();
            app.use(bodyParser.json());

            // TODO Apply routes from module
            app.get("/", (req: Request, res: Response) => {
                res.jsonp({ msg: "Hello World" });
            });

            app.get("/products", async (req: Request, res: Response) => {
                const data = await products.getAll();
                res.jsonp({ products: data });
            })

            return app;
        })
        .catch(err => {
            console.error("TypeORM Failed to Connect", err);
        });
}
