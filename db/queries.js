const pool = require("./pool");

exports.add = async (title, genres, link, image) => {
  let genreList = genres;
  if (!Array.isArray(genreList)) {
    genreList = [genres];
  }
  const placeholders = genreList.map((_, i) => `$${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `SELECT id FROM genres WHERE name IN (${placeholders})`,
    genreList
  );
  const genreIds = rows.map((row) => row.id); //[1,2,3]

  const { rows: animeRows } = await pool.query(
    "INSERT INTO animes (title, link, img_src) VALUES ($1, $2, $3) RETURNING id",
    [title, link, image]
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
    "SELECT animes.*, STRING_AGG(genres.name, ', ') AS genres FROM animes JOIN anime_genres ON animes.id = anime_genres.anime_id JOIN genres ON genres.id = anime_genres.genre_id GROUP BY animes.id;"
  );
  return rows;
};

exports.update = async (title, link, genres, image, animeId) => {
  let genreList = genres;
  if (!genreList || genreList.length === 0) {
    genreList = [];
  } else if (!Array.isArray(genreList)) {
    genreList = [genres];
  }

  const client = await pool.connect();

  try {
    await client.query(
      "UPDATE animes SET title = $1, link = $2, img_src = $3 WHERE id = $4",
      [title, link, image, animeId]
    );
    if (genreList.length > 0) {
      const placeholders = genreList.map((_, i) => `$${i + 1}`).join(", ");
      const { rows } = await pool.query(
        `SELECT id FROM genres WHERE name IN (${placeholders})`,
        genreList
      );

      const genreIds = rows.map((row) => row.id);
      await client.query("DELETE FROM anime_genres WHERE anime_id = $1", [
        animeId,
      ]);
      if (genreIds.length > 0) {
        const values = genreIds.map((_, i) => `($1, $${i + 2})`).join(", ");
        await client.query(
          `INSERT INTO anime_genres (anime_id, genre_id) VALUES ${values}`,
          [animeId, ...genreIds]
        );
      }
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating anime:", error);
  } finally {
    client.release();
  }
};

exports.delete = async (animeId) => {
  try {
    await pool.query("DELETE FROM anime_genres WHERE anime_id = $1", [animeId]);
    await pool.query("DELETE FROM animes WHERE id = $1", [animeId]);
  } catch (error) {
    console.log(error);
  }
};
