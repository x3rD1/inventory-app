exports.home = (req, res) => {
  res.render("home", { title: "Animeventory — Homepage ", css: "home.css" });
};
