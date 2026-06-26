import { Router } from "express";
import {
  add,
  deleteOne,
  getOne,
  update,
} from "../controllers/testsCollection.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router({ mergeParams: true });

//protected routes
router.use(verifyAdmin);

// testCollections
router.route("/").post(add);
router.route("/:collectionId").delete(deleteOne);
// router.route(`/link/:testCollectionId/:testId`).post(linkTest);
// router.route(`/unlink/:testCollectionId/:testId`).post(unlinkTest);
// router.route("/").get(getAll);
router.route("/:collectionId").get(getOne);
router.route("/:collectionId").patch(update);

export default router;
