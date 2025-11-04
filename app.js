const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

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
    store: new pgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
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
