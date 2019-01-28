const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      message: 'Please enter all fields'
    });
  }

  if (password.length < 6) {
    return res.status(400).send({
      message: 'Passport must be of length greater than 6'
    });
  }

  return User.findOne({ email: email }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Email already exists'
      });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.status(201).send({
                message: 'User created successfully'
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).send({
                message: 'Error registering User',
                error: err
              });
            });
        });
      });
    }
  });
});

// Login
router.post('/login', (req, res, next) => {
  return passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error) {
      res.status(400).send({
        message: 'Login Unsuccessful'
      });
    } else {
      res.status(200).send({
        message: 'Login successful',
        user
      })
    }
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
