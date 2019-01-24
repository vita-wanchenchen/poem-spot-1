/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const mongodb = require("mongodb");
const routes = require("./routes");

// Init App
const app = express();

const PORT = process.env.PORT || 3001;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Passport Config
require("./config/passport")(passport);

// Database Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// View Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Express body parser
app.use(express.urlencoded({ extended: true }));

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

// Global variables
app.use((req, { locals }, next) => {
  locals.success_msg = req.flash("success_msg");
  locals.error_msg = req.flash("error_msg");
  locals.error = req.flash("error");
  locals.user = req.user || null;
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
