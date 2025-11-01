const express = require("express");
const app = express();
const path = require("node:path");
// Routers
const indexRouter = require("./routes/indexRouter");
const homeRouter = require("./routes/homeRouter");
// This Access CSS files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
// Find EJS files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/", indexRouter);
app.use("/home", homeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Inventory app is listening on port ${PORT}`);
});
