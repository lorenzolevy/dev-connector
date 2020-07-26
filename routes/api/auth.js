const express = require("express");
// Init a router
const router = express.Router();

// @route  GET api/auth
// @desc   Test route
// @access Public -- no token needed
router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;
