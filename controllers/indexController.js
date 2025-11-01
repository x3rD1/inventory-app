exports.index = (req, res) => {
  res.render("index");
};

exports.search = (req, res) => {
  res.send("Search is working!");
};
