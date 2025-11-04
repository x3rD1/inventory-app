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
    if (toKebabCase(title) === "one-piece") {
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

  let bestMatch = "";
  let highestScore = 0;

  for (const link of links) {
    const score = diceCoefficient(kebabTitle, link);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = link;
    }
  }

  return bestMatch || null;
}

async function title(title) {
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}`
    );
    const data = await response.json();

    const kebabTitle = toKebabCase(title);
    // if anime is One Piece
    if (kebabTitle === "one-piece") {
      return data.data[1].title_english;
    }

    const uniTitle =
      data.data[0].title_english === null
        ? data.data[0].title
        : data.data[0].title_english;
    return uniTitle;
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

function getBigrams(str) {
  const s = str.toLowerCase();
  const bigrams = [];
  for (let i = 0; i < s.length; i++) {
    bigrams.push(s.slice(i, i + 2));
  }
  return bigrams;
}

function diceCoefficient(a, b) {
  const bigramsA = getBigrams(a);
  const bigramsB = getBigrams(b);

  let intersection = 0;
  const bigramsBCopy = [...bigramsB];

  for (const bg of bigramsA) {
    const index = bigramsBCopy.indexOf(bg);
    if (index !== -1) {
      intersection++;
      bigramsBCopy.splice(index, 1);
    }
  }

  return (2 * intersection) / (bigramsA.length + bigramsB.length);
}
module.exports = { image, link, title };
