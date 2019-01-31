/* eslint-disable no-param-reassign */
const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
// const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
// Database Config
const db = require("./config/keys").mongoURI;
// Passport Config
require("./config/passport")(passport);


// Init App
const app = express();

const PORT = process.env.PORT || 3001;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/build"));
}
// Passport Config
require("./config/passport")(passport);

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Express body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
  type: "application/*+json",
}));
app.use(bodyParser.json());

app.use("/public", express.static("public"));

// Express Session
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, user-token",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Global variables
app.use((req, { locals }, next) => {
  locals.success_msg = req.flash("success_msg");
  locals.error_msg = req.flash("error_msg");
  locals.error = req.flash("error");
  locals.user = req.user || null;
  next();
});

// Use Corse for API requests
app.use(cors());

// Routes
app.use(routes);
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
app.use("/poems", require("./routes/poems.js"));

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
