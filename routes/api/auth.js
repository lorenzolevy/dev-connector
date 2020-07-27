const express = require("express");
const { check, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    // After authenticating with token in header, call User and respond with user info
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(300).send("Server error");
  }
});

// @route  POST api/auth
// @desc   authenticate user and
// @access Public -- no token needed
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure req.body to get name, email, and password
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // See if user does not exist
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Compares password user entered vs encrypted pw
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }
      // Get payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // Return jsonwebtoken
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error...");
    }
  }
);

module.exports = router;
