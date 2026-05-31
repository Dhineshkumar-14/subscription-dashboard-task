import express from "express";
import { getAllSubscriptions } from "../controllers/admin.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/subscriptions", protect, isAdmin, getAllSubscriptions);

export default router;
