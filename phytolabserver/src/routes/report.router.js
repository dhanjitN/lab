import {
  add,
  clientDelete,
  deleteOne,
  getOne,
  update,
} from "../controllers/report.controller.js";
import { Router } from "express";
import { verifyPhytolab } from "../middlewares/phytolabAuth.middleware.js";

const router = Router();

router.use(verifyPhytolab);

router.route("/").post(add);
router.route("/:reportId").get(getOne);
router.route("/:reportId").patch(update);
router.route("/:reportId").delete(deleteOne);
router.route("/client/:reportId").delete(clientDelete);

export default router;
