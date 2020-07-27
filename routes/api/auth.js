const express = require("express");
// Middleware to be passed into router.get()
const auth = require("../../middleware/auth");
// Init a router
const router = express.Router();

const User = require("../../models/User");

// @route  GET api/auth
// @desc   Test
// @access Public -- no token needed
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(300).send("Server error");
  }
});

module.exports = router;
