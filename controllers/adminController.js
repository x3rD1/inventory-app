require("dotenv").config();
const db = require("../db/queries");
const fs = require("fs");

const fileContent = fs.readFileSync("redirectedLinks.txt", "utf-8");
const links = fileContent.split("\n").filter(Boolean);

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
  const image = (await getAnimeImage(title)) || null;
  const link = getAnimeLink(title);
  await db.add(title, genre, link, image);
  res.redirect("/admin/room");
};

exports.updateAnime = async (req, res) => {
  const animeId = req.params.id;
  const { title, genre } = req.body;
  const image = (await getAnimeImage(title)) || null;
  const link = getAnimeLink(title);
  await db.update(title, link, genre, image, animeId);

  res.redirect("/admin/room");
};

exports.deleteAnime = async (req, res) => {
  const animeId = req.params.id;

  await db.delete(animeId);

  res.redirect("/admin/room");
};

async function getAnimeImage(title) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}`
    );
    const data = await response.json();
    const anime = data.data[0];

    if (!anime) return null;

    return (
      anime.images?.webp?.large_image_url ||
      anime.images?.jpg?.large_image_url ||
      null
    );
  } catch (error) {
    console.error("Error fetching anime:", error);
    return null;
  }
}

function getAnimeLink(title) {
  const kebabTitle = title.toLowerCase().replace(/\s+/g, "-");

  const matchedLink = links.find((link) => link.includes(kebabTitle));
  return matchedLink;
}
