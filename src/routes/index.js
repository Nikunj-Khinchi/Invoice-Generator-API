const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes")
const invoiceRoutes = require("./invoiceRoutes")

// userRoutes
router.use("/user", userRoutes);
router.use("/invoice", invoiceRoutes);

module.exports = router;
