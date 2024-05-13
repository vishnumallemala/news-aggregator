const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/verifyJWT");
const validator = require("../helpers/validator");

router.post("/register", (req, res) => {
  const validate = validator.validateUserDetails(req.body);
  if (!validate.status) {
    return res.status(400).json({ message: validate.message });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    preferences: req.body.preferences,
  });
  user
    .save()
    .then((data) => {
      return res.status(200).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ error: JSON.parse(JSON.stringify(err)) });
    });
});

router.post("/login", (req, res) => {
  let emailPassed = req.body.email;
  let passwordPassed = req.body.password;
  User.findOne({
    email: emailPassed,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      var isPasswordValid = bcrypt.compareSync(passwordPassed, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({
          message: "Invalid Password",
        });
      } else {
        var token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            preferences: user.preferences,
          },
          process.env.SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).send({
          user: {
            id: user.id,
          },
          message: "Login successful",
          accessToken: token,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: JSON.parse(JSON.stringify(err)) });
    });
});

router.get("/preferences", verifyToken, (req, res) => {
  let filter = { email: req.options.email };

  User.find(filter, { password: 0, __v: 0 })
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({ preferences: result[0].preferences });
    })
    .catch((err) => {
      res.status(500).json({ error: JSON.parse(JSON.stringify(err)) });
    });
});

router.put("/preferences", verifyToken, (req, res) => {
  let filter = { email: req.options.email };
  let pref = {
    preferences: req.body.preferences,
  };

  User.findOneAndUpdate(filter, pref, { new: true })
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({ preferences: result.preferences });
    })
    .catch((err) => {
      res.status(500).json({ error: JSON.parse(JSON.stringify(err)) });
    });
});

module.exports = router;
