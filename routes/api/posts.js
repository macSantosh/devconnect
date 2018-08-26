const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
//const Post = mongoose.model("post"); //doesnot work
const validatePostInput = require("../../validation/post");

//@route POST api/posts/
//@desc create post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check validations
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar, //can pull from redux
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.send(err));
  }
);

//@route get api/posts/
//@desc get posts
//@access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ data: -1 })
    .then(posts => {
      if (posts) {
        res.json(posts);
      }
    })
    .catch(err =>
      res.status(404).send({ nopostsfound: "no post found for this id" })
    );
});

//@route get api/posts/:id
//@desc get post by ID
//@access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post);
      }
    })
    .catch(err =>
      res.status(404).send({ nopostfound: "no post forund for this id" })
    );
});

//@route Delete api/posts/:id
//@desc Delete post by ID
//@access Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          if (post.user.toString() !== req.user.id) {
            //user not authorized
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          } else {
            post
              .remove()
              .then(() => res.json({ success: "true" }))
              .catch(err => res.status(400).send(err));
          }
        });
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "no profile found for this user" })
      );
  }
);

//@route POST api/posts/like/:id
//@desc  like the post by post id
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // console.log("post :" + JSON.stringify(post));
            if (post) {
              if (
                post.likes.filter(like => like.user.toString() === req.user.id)
                  .length > 0
              ) {
                //if user has already liked the post
                return res
                  .status(400)
                  .json({ alreadyLiked: "User already liked this post" });
              }
              post.likes.unshift({ user: req.user.id });
              post.save().then(post => res.json(post)); //save post
            } else {
              return res
                .status(404)
                .json({ nopostfound: "no post foudn for this id" });
            }
          })
          .catch(err => res.status(404).send(err));
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "no profile found for this user" })
      );
  }
);

//@route POST api/posts/unlike/:id
//@desc  like the post by post id
//@access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (post) {
              if (
                post.likes.filter(like => like.user.toString() === req.user.id)
                  .length === 0
              ) {
                //if user has already liked the post
                res
                  .status(400)
                  .json({ notLiked: "User have not liked this post" });
              }
              const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id); //find user to remove

              post.likes.splice(removeIndex, 1);
              post.save().then(post => res.json(post)); //save post
            } else {
              res
                .status(404)
                .json({ nopostfound: "no post foudn for this id" });
            }
          })
          .catch(err => res.status(404).send(err));
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "no profile found for this user" })
      );
  }
);

//@route POST api/posts/comment/:id
//@desc  comment on post by id
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check validations
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }
    Post.findById(req.params.id).then(post => {
      // console.log("post :" + JSON.stringify(post));
      if (post) {
        const newComment = {
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar,
          user: req.user.id
        };
        post.comments.unshift(newComment);

        post.save().then(post => res.json(post)); //save post
      } else {
        res.status(404).json({ nopostfound: "no post found for this id" });
      }
    });
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc  remove comment from post
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      // console.log("post :" + JSON.stringify(post));
      if (
        post &&
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length > 0
      ) {
        var removeIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post)); //save post
      } else {
        res
          .status(404)
          .json({ nocommentfound: "no comment found for this post" });
      }
    });
  }
);

module.exports = router;
