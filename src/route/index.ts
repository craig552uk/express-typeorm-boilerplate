import { Router } from "express";
import * as homeRouter from "../route/homeRouter";
import * as productRouter from "../route/productRouter";

const router = Router();

// Apply imported routes
// TODO Autoload all route modules
router.use(homeRouter);
router.use(productRouter);

export = router;