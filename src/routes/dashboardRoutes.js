const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardControllers");
const auth = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

router.use(auth);

// Viewer + Analyst + Admin can access dashboard
router.get("/summary", authorize(["VIEWER", "ANALYST", "ADMIN"]), dashboardController.getSummary);

router.get("/categories", authorize(["ANALYST", "ADMIN"]), dashboardController.getCategoryBreakdown);

router.get("/recent", authorize(["ANALYST", "ADMIN"]), dashboardController.getRecentActivity);

router.get("/trends", authorize(["ANALYST", "ADMIN"]), dashboardController.getMonthlyTrends);

module.exports = router;