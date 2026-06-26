import {
  add,
  deleteOne,
  updateOne,
  getAll,
  getDoctors,
} from "../controllers/doctor.controller.js";
import { Router } from "express";
import { verifyPhytolab } from "../middlewares/phytolabAuth.middleware.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router({ mergeParams: true });

router.route("/").post(verifyAdmin, add);
router.route("/:doctorId").delete(verifyAdmin, deleteOne);
router.route("/:doctorId").patch(verifyAdmin, updateOne);
router.route("/get").get(verifyAdmin, getAll);
router.route("/").get(verifyPhytolab, getDoctors);

export default router;
