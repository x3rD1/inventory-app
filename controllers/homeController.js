const db = require("../db/queries");

exports.home = async (req, res) => {
  const animeList = await db.showAnimeList();
  res.render("home", {
    title: "Animeventory — Homepage ",
    css: "home.css",
    script: "AddAnimeModal.js",
    animes: animeList,
  });
};
