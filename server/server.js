import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { initDb } from "./src/config/initDb.js";
import { seedPlans } from "./src/seeds/plan.seed.js";

import authRoutes from "./src/routes/auth.routes.js";
import planRoutes from "./src/routes/plan.routes.js";
import subscriptionRoutes from "./src/routes/subscription.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin", adminRoutes);

const startServer = async () => {
  try {
    await initDb();
    await seedPlans();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
  }
};

startServer();
