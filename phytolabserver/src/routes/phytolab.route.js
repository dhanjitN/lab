import { Router } from "express";
import {
  add,
  deleteOne,
  get,
  update,
} from "../controllers/phytolab.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.use(verifyAdmin);

//protected routes
router.route("/").post(add);
router.route("/").get(get);
router.route("/:id").patch(update);
router.route("/:id").delete(deleteOne);

export default router;
