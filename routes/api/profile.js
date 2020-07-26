const express = require("express");
// Init a router
const router = express.Router();

// @route  GET api/profile
// @desc   Test route
// @access Public -- no token needed
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;
