import express from "express";
import openRoutes from "./open.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";
import clubRouters from "./club.router.js"
 
const router = express.Router();
import {} from "dotenv/config";

// Mount routes with their respective prefixes
router.use("/v0", openRoutes);
router.use("/v1", userRoutes);
router.use("/v1/admin", adminRoutes);
router.use("/v2/club",clubRouters)

export default router;
