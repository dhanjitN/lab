import {
  add,
  update,
  getOne,
  deleteOne,
  getAll,
} from "../controllers/testCategory.controller.js";

import { Router } from "express";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router({ mergeParams: true });

// protect the route

router.use(verifyAdmin);

router.route("/").post(add);
router.route("/").get(getAll);
router.route("/:categoryId").get(getOne);
router.route("/:categoryId").patch(update);
router.route("/:categoryId").delete(deleteOne);

export default router;
