const express = require("express");
// Init a router
const router = express.Router();

// @route  GET api/users
// @desc   Test route
// @access Public -- no token needed
router.get("/", (req, res) => res.send("User route"));

module.exports = router;
