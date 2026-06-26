import {
  add,
  update,
  deleteOne,
  getOne,
  getAll,
} from "../controllers/tests.controller.js";

import { Router } from "express";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router({ mergeParams: true });

router.use(verifyAdmin);

router.route("/").post(add);
router.route("/:testId").delete(deleteOne);
router.route("/:testId").patch(update);
router.route("/all").get(getAll);
router.route("/one/:testId").get(getOne);
export default router;
