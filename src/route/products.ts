import { Router, Request, Response, NextFunction } from "express";
import { Products } from "../controller/Products";

const router = Router();

router.get("/products", (req: Request, res: Response, next: NextFunction) => {
    Products.getAll()
        .then(data => res.jsonp({ data: data })).then(next, next);
});

router.post("/products", (req: Request, res: Response, next: NextFunction) => {
    Products.add(req.body)
        .then(data => res.jsonp({ data: data })).then(next, next);
});

router.get("/products/:id", (req: Request, res: Response, next: NextFunction) => {
    Products.getById(req.params.id)
        .then(data => res.jsonp({ data: data })).then(next, next);
});

router.post("/products/:id", (req: Request, res: Response, next: NextFunction) => {
    Products.updateById(req.params.id, req.body)
        .then(data => res.jsonp({ data: data })).then(next, next);
});

router.delete("/products/:id", (req: Request, res: Response, next: NextFunction) => {
    Products.deleteById(req.params.id)
        .then(data => res.jsonp({ data: data })).then(next, next);
});

export = router;