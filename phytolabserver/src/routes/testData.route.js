import { Router } from "express";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";
import { verifyPhytolab } from "../middlewares/phytolabAuth.middleware.js";
import {
  addTestData,
  deleteTestData,
  getAll,
  getOne,
  getTestData,
  linkTestData,
  unlinkTestData,
  updateTestData,
} from "../controllers/testData.controller.js";

const router = Router();

// router.use(verfyPhytolab);

// admin

router.route("/").post(verifyAdmin, addTestData);
router.route("/all").get(verifyAdmin, getAll);
router.route("/:phytolabId").get(verifyAdmin, getOne);
router.route("/:testDataId").patch(verifyAdmin, updateTestData);
router.route("/:testDataId").delete(verifyAdmin, deleteTestData);

router.route("/link/:testDataId").post(verifyAdmin, linkTestData);
router.route("/unlink/:testDataId").post(verifyAdmin, unlinkTestData);

// phytolab
router.route("/").get(verifyPhytolab, getTestData);

export default router;
