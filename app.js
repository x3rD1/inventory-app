const express = require("express");
const session = require("express-session");
const app = express();
const path = require("node:path");
require("dotenv").config();
// Routers
const indexRouter = require("./routes/indexRouter");
const homeRouter = require("./routes/homeRouter");
const loginRouter = require("./routes/loginRouter");
const adminRouter = require("./routes/adminRouter");
// This Access CSS files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
// Find EJS files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Session Config
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);
// Routes
app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/login", loginRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Inventory app is listening on port ${PORT}`);
});
