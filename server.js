const express = require("express");
const bodyParser = require("body-parser");

const dbConnect = require("./mongodbConnect");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello ");
});

//use routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("server is running on port  " + port);
});
