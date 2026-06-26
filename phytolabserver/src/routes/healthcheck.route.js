import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";
const router = Router();

// router.use(verifyAdmin);

router.route("/").get(healthCheck);

export default router;
