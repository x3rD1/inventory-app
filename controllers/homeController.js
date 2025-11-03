const db = require("../db/queries");
const getAnime = require("../public/functionHelpers/getAnimeInfo");

exports.home = async (req, res) => {
  const animeList = await db.showAnimeList();
  res.render("home", {
    title: "Animeventory — Homepage ",
    css: "styles/home.css",
    script: "functionHelpers/homeScript.js",
    animes: animeList,
  });
};

exports.addAnime = async (req, res) => {
  const { title, genre } = req.body;
  const newTitle = await getAnime.title(title);
  const image = (await getAnime.image(newTitle)) || null;
  const link = getAnime.link(newTitle);
  await db.add(newTitle, genre, link, image);
  res.redirect("/home");
};
