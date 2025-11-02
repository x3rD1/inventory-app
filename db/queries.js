const pool = require("./pool");

exports.add = async (title, genres, link) => {
  const placeholders = genres.map((_, i) => `$${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `SELECT id FROM genres WHERE name IN (${placeholders})`,
    genres
  );
  const genreIds = rows.map((row) => row.id); //[1,2,3]

  const { rows: animeRows } = await pool.query(
    "INSERT INTO animes (title, link) VALUES ($1, $2) RETURNING id",
    [title, link]
  );
  const animeId = animeRows[0].id; // rows: [{ id: 1}]

  // Uses genreIds length to create placeholders
  const values = genreIds.map((_, i) => `($1, $${i + 2})`).join(", ");

  await pool.query(
    `INSERT INTO anime_genres (anime_id, genre_id) VALUES ${values}`, // ($1, $2), ($1, $3)
    [animeId, ...genreIds] // [1, 2, 3, 4, 5, ...]
  );
};

exports.showAnimeList = async () => {
  const { rows } = await pool.query(
    "SELECT animes.*, STRING_AGG(genres.name, ', ') AS genres FROM animes JOIN anime_genres ON animes.id = anime_genres.anime_id JOIN genres ON genres.id = anime_genres.genre_id GROUP BY animes.id, animes.title;"
  );
  return rows;
};

exports.delete = async (animeId) => {
  try {
    await pool.query("DELETE FROM anime_genres WHERE anime_id = $1", [animeId]);
    await pool.query("DELETE FROM animes WHERE id = $1", [animeId]);
  } catch (error) {
    console.log(error);
  }
};
