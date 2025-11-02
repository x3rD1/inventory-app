const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS animes (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS anime_genres (
        anime_id INT REFERENCES animes(id),
        genre_id INT REFERENCES genres(id)
    );
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Tables successfully created!");
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
    console.log("DONE!");
  }
}

main();
