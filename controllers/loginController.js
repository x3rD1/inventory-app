require("dotenv").config();

exports.login = (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect("/login/admin");
  }
  res.render("login", { title: "Animeventory — Login", css: "login.css" });
};

exports.adminPost = (req, res) => {
  const password = req.body.password;
  if (password !== process.env.ADMIN_PASS) {
    return res.redirect("/login");
  }

  req.session.isAdmin = true;
  res.redirect("/login/admin");
};

exports.adminPage = (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect("/login");
  }

  res.render("admin", { title: "Animeventory — Admin", css: "admin.css" });
};
