require("dotenv").config();

exports.login = (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect("/admin/room");
  }
  res.render("login", {
    title: "Animeventory — Login",
    css: "styles/login.css",
    script: "",
  });
};
