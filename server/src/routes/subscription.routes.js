import express from "express";
import {
  getMySubscription,
  subscribeToPlan,
} from "../controllers/subscription.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe/:planId", protect, subscribeToPlan);

router.get("/my-subscription", protect, getMySubscription);

export default router;
