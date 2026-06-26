import { Router } from "express";
import { add, getOne } from "../controllers/reportCollection.controller.js";
import { verifyPhytolab } from "../middlewares/phytolabAuth.middleware.js";
const router = Router();

// phytolab middleare

router.use(verifyPhytolab);

//protected routes
router.route("/").post(add);
router.route("/").get(getOne);
// router.route('/').patch()
// router.route('/').delete()

export default router;
