const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

//load mongoose models
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperianceInput = require("../../validation/experiance");
const validateEducationInput = require("../../validation/education");

//@route GET api/profile
//@desc get current user profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //console.log("found user:  " + req.user.id + " name:" + req.user.name);
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]) //get user details for forign key
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no profile for this user";
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).send(err));
  }
);

//@route POST api/profile
//@desc create or UPDATE current user profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check validation
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //skills spilt into array e.g "java, nodejs, j2ee"
    if (typeof req.body.skills != "undefined") {
      profileFields.skills = req.body.skills.split(",");
      profileFields.skills = profileFields.skills.map(skill => skill.trim()); //trim all skills
    }
    //social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          //update prfile
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          //create profile

          //check if handle already exists with anyother user
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }
          });
          new Profile(profileFields).save().then(profile => res.json(profile)); //save profile
        }
      })
      .catch(err => res.status(400).send(err));
  }
);

//@route POST api/profile/handle/:handle
//@desc this is backend route to get profile by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  //todo: tye to change req.query.params
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).send(errors);
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.send(err));
});

//@route POST api/profile/user/:user_id
//@desc  get profile by user id
//@access Private
router.get(
  "/user/:user_id",
  //passport.authenticate("jwt", { session: false }),  //dont need to be secure for now
  (req, res) => {
    const errors = {};
    //todo: tye to change req.query.params
    Profile.findOne({ user: req.params.user_id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no profile for this user";
          res.status(404).send(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => res.send({ profile: "there is no profile for this user" }));
  }
);

//@route POST api/profile/all
//@desc  get all profile
//@access Public
router.get(
  "/all",
  //passport.authenticate("jwt", { session: false }),  //dont need to be secure for now
  (req, res) => {
    const errors = {};
    //todo: tye to change req.query.params
    Profile.find()
      .populate("user", ["name", "avatar"])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "there are no profiles";
          res.status(404).send(errors);
        } else {
          res.json(profiles);
        }
      })
      .catch(err => res.send({ noprofile: "there are no profiles" }));
  }
);

//@route POST api/profile/experiance
//@desc  add experiance all profile
//@access Private
router.post(
  "/experiance",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validate input data
    const { errors, isValid } = validateExperianceInput(req.body);
    if (!isValid) {
      return res.status(400).send(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        //add exp at bigining
        profile.experience.unshift(newExp);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.send(err));
      }
    });
  }
);

//@route POST api/profile/education
//@desc  add education all profile
//@access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validate input data
    const { errors, isValid } = validateEducationInput(req.body);
    //console.log(" errors : " + JSON.stringify(errors));
    if (!isValid) {
      res.status(400).send(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        //add exp at bigining
        profile.education.unshift(newEdu);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.send(err));
      }
    });
  }
);

//@route DELETE api/profile/experiance/:exp_id
//@desc  delete education of user profile
//@access Private
router.delete(
  "/experiance/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          //get index of exp id
          //console.log(" experiance : " + JSON.stringify(profile.experience));
          const removeIndex = profile.experience
            .map(item => item._id.toString()) //maps the array elements by ids
            .indexOf(req.params.exp_id); // get the index of experiance id

          //console.log(" experiance remove index: " + removeIndex);
          //splice oit of array
          profile.experience.splice(removeIndex, 1);
          profile
            .save()
            .then(profile => res.send(profile))
            .catch(err => res.send(err));
        } else {
          res
            .status(404)
            .send({ noexperiance: "no experiance found to delete" });
        }
      })
      .catch(err => res.status(404).send(err));
  }
);

//@route DELETE api/profile/education/:edu_id
//@desc  delete education of user profile
//@access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          //get index of exp id

          const removeIndex = profile.education
            .map(item => item.id) //maps the array elements by ids
            .indexOf(req.params.edu_id); // get the index of experiance id

          //splice oit of array
          profile.education.splice(removeIndex, 1);
          profile
            .save()
            .then(profile => res.send(profile))
            .catch(err => res.send(err));
        } else {
          res.status(404).send({ noeducation: "no education found to delete" });
        }
      })
      .catch(err => res.status(404).send(err));
  }
);

//@route DELETE api/profile/
//@desc  delete user and profile
//@access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      })
      .catch(err => res.status(404).send(err));
  }
);

module.exports = router;
