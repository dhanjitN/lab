import { Router } from "express";
import { login, register } from "../controllers/admin.controller.js";

const router = Router();


//protected routes
router.route("/register").post(register);
router.route("/login").post(login);
/* router.route("/").patch();
router.route("/").delete(); */

export default router;
