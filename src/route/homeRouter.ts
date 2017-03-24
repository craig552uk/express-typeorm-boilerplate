import { Router, Request, Response, NextFunction } from "express";
import { ImATeapot } from "http-errors";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.jsonp({ data: "😃 Hello API! 😃" });
    next();
});

router.get("/teapot", (req: Request, res: Response) => {
    throw new ImATeapot();
});

router.get("/error", (req: Request, res: Response) => {
    throw new Error("Danger Will Robinson");
});

export = router;