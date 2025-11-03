const fs = require("fs");

const fileContent = fs.readFileSync("redirectedLinks.txt", "utf-8");
const links = fileContent.split("\n").filter(Boolean);

async function image(title) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}`
    );
    const data = await response.json();
    // If anime is One Piece
    if (title.toLowerCase().replace(/\s+/g, "-") === "one-piece") {
      const anime = data.data[1];
      return (
        anime.images?.webp?.large_image_url ||
        anime.images?.jpg?.large_image_url ||
        null
      );
    }

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

function link(title) {
  const kebabTitle = toKebabCase(title);

  const matchedLink = links.find((link) => link.includes(kebabTitle));
  return matchedLink;
}

async function title(title) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}`
    );
    const data = await response.json();
    // if anime is One Piece
    const kebabTitle = toKebabCase(title);
    if (kebabTitle === "one-piece") {
      return data.data[1].title_english;
    }
    return data.data[0].title_english;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function toKebabCase(str) {
  str = str.replace(/[:'’]/g, "");
  str = str.trim();
  str = str.replace(/\s+/g, "-");
  return str.toLowerCase();
}

module.exports = { image, link, title };
