const express = require("express");
const router = express.Router();

const recordController = require("../controllers/recordControllers");
const auth = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

// Apply auth to all routes
router.use(auth);

// CREATE → only ADMIN
router.post("/", authorize(["ADMIN"]), recordController.createRecord);

// READ → ANALYST + ADMIN
router.get("/", authorize(["ANALYST", "ADMIN"]), recordController.getRecords);

// UPDATE → ADMIN
router.put("/:id", authorize(["ADMIN"]), recordController.updateRecord);

// DELETE → ADMIN
router.delete("/:id", authorize(["ADMIN"]), recordController.deleteRecord);

module.exports = router;