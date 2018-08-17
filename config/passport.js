const JwtStrategy = require("passport-jwt").Strategy;
const JwtExtract = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
//const User = require("../models/User");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = JwtExtract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.JWT_SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user); //done(error, user)
          }
          return null, false;
        })
        .catch(err => console.log(err));
    })
  );
};
