import { Connection } from "typeorm";
import { Router, Request, Response, NextFunction } from "express";
import { ProductController } from "../controller/ProductController";

let init = function(connection: Connection): Router {
    
    const products = ProductController.getInstance();
    const router = Router();

    router.get("/products", (req: Request, res: Response, next: NextFunction) => {
        products.getAll()
            .then(data => res.jsonp({ data: data })).catch(next);
    });

    router.post("/products", (req: Request, res: Response, next: NextFunction) => {
        products.add(req.body)
            .then(data => res.jsonp({ data: data })).catch(next);
    });

    router.get("/products/:id", (req: Request, res: Response, next: NextFunction) => {
        products.getById(req.params.id)
            .then(data => res.jsonp({ data: data })).catch(next);
    });

    router.post("/products/:id", (req: Request, res: Response, next: NextFunction) => {
        products.updateById(req.params.id, req.body)
            .then(data => res.jsonp({ data: data })).catch(next);
    });

    router.delete("/products/:id", (req: Request, res: Response, next: NextFunction) => {
        products.deleteById(req.params.id)
            .then(data => res.jsonp({ data: data })).catch(next);
    });

    return router;
}

export = init;