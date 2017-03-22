import { Router } from "express";
import * as home from "../route/home";
import * as products from "../route/products";

const router = Router();

// Apply imported routes
// TODO Autoload all route modules
router.use(home);
router.use(products);

export = router;