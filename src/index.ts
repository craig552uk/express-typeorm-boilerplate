import "reflect-metadata";
import { Request, Response } from "express";
import { app } from "./lib/app";

app.get("/", (req: Request, res: Response) => {
    let name = req.query.name || "World";
    res.jsonp({ msg: `Hello ${name}!` });
});

app.listen(1337, () => console.log("Listening on http://localhost:1337"));
