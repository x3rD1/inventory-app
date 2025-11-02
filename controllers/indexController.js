exports.index = (req, res) => {
  res.render("index", {
    title: "Animeventory — Watch Anime Online",
    css: "index.css",
    script: "",
  });
};

exports.search = (req, res) => {
  res.send("Search is working!");
};
