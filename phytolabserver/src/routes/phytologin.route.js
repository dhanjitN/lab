import { login, logout, verify } from "../controllers/phytolab.controller.js";

import { Router } from "express";
import { verifyPhytolab } from "../middlewares/phytolabAuth.middleware.js";

const router = Router();

router.route("/login").post(login);
router.route("/verify").post(verifyPhytolab, verify);
router.route("/logout").post(verifyPhytolab, logout);

export default router;
