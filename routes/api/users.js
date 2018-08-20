const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//load user model
const User = require("../../models/User");

//@route POST api/users/register
//@desc Regsiter the user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      //if user already exist throw error 400
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {
      //if new user, create new user
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar, //try giving avator:avator
        password: req.body.password
      });

      // bcrypt.genSalt(10, (err, salt) => {
      //   bcrypt.hash(newUser.password, salt, (err, hash) => {
      //     if (err) {
      //       throw err;
      //     }
      //     newUser.password = hash;
      //     newUser
      //       .save()
      //       .then(user => res.json(user))
      //       .catch(err => {
      //         console.log(err);
      //       });
      //   });
      // }); //suggested by tutorial

      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => console.log(err));
      });
    }
  });
});

//@route GET api/users/login
//@desc login user / returning JWT token
//@access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt payload
        //sign token
        var token = jwt.sign(payload, keys.JWT_SECRET, { expiresIn: 60 * 60 }); //expires in 60 sec
        res.json({
          success: true,
          token: "Bearer " + token
        });
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route GET api/users/current for test
//@desc retur curretn user
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

module.exports = router;
