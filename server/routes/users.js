const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/user");

// Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // if (!name || !email || !password) {
  //   return res.status(400).send({
  //     message: "Please enter all fields",
  //   });
  // }

  // if (password.length < 6) {
  //   return res.status(400).send({
  //     message: "Password must be of length greater than 6",
  //   });
  // }

  return User.findOne({ email }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Email already exists",
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err1, salt) => {
        bcrypt.hash(newUser.password, salt, (err2, hash) => {
          if (err2) throw err2;
          newUser.password = hash;
          newUser
            .save()
            .then((/* user */) => {
              res.status(201).send({
                message: "User created successfully",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send({
                message: "Error registering User",
                error: err,
              });
            });
        });
      });
    }
  });
});

// Login
router.post("/login", (req, res, next) => passport.authenticate(
  "local",
  { session: true },
  // NOTE: If you use a custom override method here, you must manually call
  // req.login and serialize/deserialize user. See: https://stackoverflow.com/a/36525372/802397
  (error, user) => {
    if (error) {
      res.status(400).send({
        message: "Login Unsuccessful",
      });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;

        res.status(200).send({
          message: "Login successful",
          user,
        });
        // NOTE: you should be doing res.redirect here instead of in clientside - maybe.
      });
    }
  },
)(req, res, next));


// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

// Get user data
// eslint-disable-next-line no-unused-vars
router.get("/self", (req, res) => {
  res.json(req.user);
});

module.exports = router;
