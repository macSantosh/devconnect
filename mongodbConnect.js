const mongoose = require("mongoose");
const dbUri = require("./config/keys").mongoURI;

// var dbConnect = mongoose.connect(
//   dbUri,
//   { useNewUrlParser: true },
//   function(err) {
//     if (err) {
//       console.error("could not connect to database " + dbUri);
//     } else {
//       console.log("connected to database " + dbUri);
//     }
//   }
// );

var dbConnect = mongoose
  .connect(
    dbUri,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connectecd to database " + dbUri);
  })
  .catch(err => {
    console.error("coould not connect to database " + err);
  });

module.exports = dbConnect;
