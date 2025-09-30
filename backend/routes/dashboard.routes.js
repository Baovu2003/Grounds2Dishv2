const express = require("express");
const router = express.Router();
const salesController = require("../controller/dashboard.controller");

// API gộp
router.get("/stats/overview", salesController.getDashboardOverview);

module.exports = router;
