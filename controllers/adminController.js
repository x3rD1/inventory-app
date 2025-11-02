require("dotenv").config();
const db = require("../db/queries");

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
    css: "admin.css",
    script: "AddAnimeModal.js",
    animes: animeList,
  });
};

exports.addAnime = async (req, res) => {
  const { title, genre } = req.body;

  await db.add(title, genre);
  res.redirect("/admin/room");
};

exports.deleteAnime = async (req, res) => {
  const animeId = req.params.id;

  await db.delete(animeId);

  res.redirect("/admin/room");
};
