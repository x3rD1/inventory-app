require("dotenv").config();
const db = require("../db/queries");
const getAnime = require("../public/functionHelpers/getAnimeInfo");

exports.adminPost = (req, res) => {
  const password = req.body.password;
  if (password !== process.env.ADMIN_PASS) {
    return res.redirect("/login");
  }

  req.session.isAdmin = true;
  res.redirect("/admin/room");
};

exports.adminPage = async (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect("/login");
  }

  const animeList = await db.showAnimeList();
  res.render("admin", {
    title: "Animeventory — Admin",
    css: "styles/admin.css",
    script: "functionHelpers/adminScript.js",
    animes: animeList,
  });
};

exports.addAnime = async (req, res) => {
  const { title, genre } = req.body;
  const newTitle = await getAnime.title(title);
  const image = (await getAnime.image(newTitle)) || null;
  const link = getAnime.link(newTitle);
  await db.add(newTitle, genre, link, image);
  res.redirect("/admin/room");
};

exports.updateAnime = async (req, res) => {
  const animeId = req.params.id;
  const { title, genre } = req.body;
  const newTitle = await getAnime.title(title);
  const image = (await getAnime.image(newTitle)) || null;
  const link = getAnime.link(newTitle);
  await db.update(newTitle, link, genre, image, animeId);

  res.redirect("/admin/room");
};

exports.deleteAnime = async (req, res) => {
  const animeId = req.params.id;

  await db.delete(animeId);

  res.redirect("/admin/room");
};
