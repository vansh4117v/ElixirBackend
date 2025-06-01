import express from "express";
import openRoutes from "./open.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";

const router = express.Router();
import {} from "dotenv/config";

// Mount routes with their respective prefixes
router.use("/v0", openRoutes);
router.use("/v1", userRoutes);
router.use("/v1/admin", adminRoutes);

export default router;
