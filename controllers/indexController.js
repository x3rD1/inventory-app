exports.index = (req, res) => {
  res.render("index", {
    title: "Animeventory — Watch Anime Online",
    css: "index.css",
  });
};

exports.search = (req, res) => {
  res.send("Search is working!");
};
