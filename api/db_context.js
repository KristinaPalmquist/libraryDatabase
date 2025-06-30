import database_address from ".env";
const pgp = require("pg-promise")();
const db = pgp(database_address);

async function selectAllTitles() {
  let titles = await db.many(
    `SELECT 
      title.title_id,
      title.name,
      title.year,
      title.quantity,
      title.available,
      title.loaned,
      author.name as author_name,
      STRING_AGG(genre.name, ', ' ORDER BY genre.name) as genre_name
    FROM title 
    INNER JOIN book_genre ON title.title_id = book_genre.book_id 
    JOIN genre ON book_genre.genre_id = genre.genre_id 
    JOIN author ON title.author_id = author.author_id 
    GROUP BY title.title_id, title.name, title.year, title.quantity, title.available, title.loaned, author.name
    ORDER BY title.title_id`
  );
  return titles;
}

async function selectTitleByKeyword(keyword) {
  let data = await db.any(
    `SELECT 
      title.title_id,
      title.name,
      author.name as author_name,
      title.year,
      STRING_AGG(genre.name, ', ' ORDER BY genre.name) as genre_name,
      title.quantity,
      title.available,
      title.loaned
    FROM title 
    JOIN author ON title.author_id = author.author_id 
    LEFT JOIN book_genre ON title.title_id = book_genre.book_id 
    LEFT JOIN genre ON book_genre.genre_id = genre.genre_id
    WHERE (LOWER(title.name) LIKE LOWER('%${keyword}%') OR LOWER(author.name) LIKE LOWER('%${keyword}%'))
    GROUP BY title.title_id, title.name, author.name, title.year, title.quantity, title.available, title.loaned`
  );
  return data;
}

async function selectAuthorByKeyword(keyword) {
  let data = await db.any(
    `SELECT 
      title.title_id,
      title.name,
      author.name as author_name,
      title.year,
      STRING_AGG(genre.name, ', ' ORDER BY genre.name) as genre_name,
      title.quantity,
      title.available,
      title.loaned
    FROM title 
    JOIN author ON title.author_id = author.author_id 
    LEFT JOIN book_genre ON title.title_id = book_genre.book_id 
    LEFT JOIN genre ON book_genre.genre_id = genre.genre_id
    WHERE (LOWER(author.name) LIKE LOWER('%${keyword}%'))
    GROUP BY title.title_id, title.name, author.name, title.year, title.quantity, title.available, title.loaned`
  );
  return data;
}

async function insertTitle(
  titleBook,
  publYear,
  authorName,
  genreNames, // Array of genre names
  quantity = 5,
  available = 5,
  loaned = 0
) {
  try {
    // Start a transaction
    await db.tx(async (t) => {
      // 1. Check if author exists, if not create it
      let author = await t.oneOrNone(
        "SELECT author_id FROM author WHERE LOWER(name) = LOWER($1)",
        [authorName]
      );

      if (!author) {
        author = await t.one(
          "INSERT INTO author (name) VALUES ($1) RETURNING author_id",
          [authorName]
        );
      }

      // 2. Insert the title
      const newTitle = await t.one(
        `INSERT INTO title (name, year, author_id, quantity, available, loaned) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING title_id`,
        [
          titleBook,
          publYear,
          author.author_id,
          quantity,
          available,
          loaned,
        ]
      );

      // 3. Handle genres (if genreNames is provided)
      if (genreNames && genreNames.length > 0) {
        for (const genreName of genreNames) {
          // Check if genre exists, if not create it
          let genre = await t.oneOrNone(
            "SELECT genre_id FROM genre WHERE LOWER(name) = LOWER($1)",
            [genreName]
          );

          if (!genre) {
            genre = await t.one(
              "INSERT INTO genre (name) VALUES ($1) RETURNING genre_id",
              [genreName]
            );
          }

          // Create the book-genre relationship
          await t.none(
            "INSERT INTO book_genre (book_id, genre_id) VALUES ($1, $2)",
            [newTitle.title_id, genre.genre_id]
          );
        }
      }

      return newTitle.title_id;
    });
  } catch (error) {
    console.error("Error inserting title:", error);
    throw error;
  }
}

async function updateTitle(
  titleId,
  titleBook,
  publYear,
  authorName,
  genre
) {
  db.none(
    `UPDATE title SET name = '${titleBook}', published_year = ${publYear}, author_name = '${authorName}', genre = '${genre}' WHERE title.id = ${titleId}`
  );
}

async function loanTitle(
  titleId,
  availableQuantity,
  loanedQuantity
) {
  db.none(
    `UPDATE title SET available = '${availableQuantity}', loaned = ${loanedQuantity} WHERE title.id = ${titleId}`
  );
}

async function deleteTitle(titleId) {
  await db.none(
    `DELETE FROM title WHERE title_id = '${titleId}'`
  );
}

// Helper function to get or create an author
async function getOrCreateAuthor(authorName) {
  let author = await db.oneOrNone(
    "SELECT author_id FROM author WHERE LOWER(name) = LOWER($1)",
    [authorName]
  );

  if (!author) {
    author = await db.one(
      "INSERT INTO author (name) VALUES ($1) RETURNING author_id",
      [authorName]
    );
  }

  return author.author_id;
}

// Helper function to get or create a genre
async function getOrCreateGenre(genreName) {
  let genre = await db.oneOrNone(
    "SELECT genre_id FROM genre WHERE LOWER(name) = LOWER($1)",
    [genreName]
  );

  if (!genre) {
    genre = await db.one(
      "INSERT INTO genre (name) VALUES ($1) RETURNING genre_id",
      [genreName]
    );
  }

  return genre.genre_id;
}

// Function to get all authors
async function getAllAuthors() {
  return await db.many(
    "SELECT * FROM author ORDER BY name"
  );
}

// Function to get all genres
async function getAllGenres() {
  return await db.many("SELECT * FROM genre ORDER BY name");
}

module.exports = {
  selectAllTitles,
  selectTitleByKeyword,
  selectAuthorByKeyword,
  insertTitle,
  updateTitle,
  loanTitle,
  deleteTitle,
  getOrCreateAuthor,
  getOrCreateGenre,
  getAllAuthors,
  getAllGenres,
};
