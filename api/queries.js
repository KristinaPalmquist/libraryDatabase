// Queries for Title table
const getTitles = 'SELECT * FROM title'
const getTitleById = 'SELECT * FROM title WHERE id = $1'
const checkTitleExists = 'SELECT t FROM title t WHERE t.title_book = $1'
const addTitle =
    'INSERT INTO title (title_book, publ_year, author_id, genre_1, genre_2, genre_3) VALUES ($1, $2, $3, $4, $5, $6)'
const removeTitle = 'DELETE FROM title WHERE id = $1'
// how to update all fields???
const updateTitle = 'UPDATE title SET title_book = $1 WHERE id = $2'

// Queries for Author table
const getAuthors = 'SELECT * FROM author'
const getAuthorById = 'SELECT * FROM author WHERE id = $1'
const checkAuthorExists = 'SELECT a FROM author a WHERE a.author = $1'
const addAuthor = 'INSERT INTO author (first_name, last_name) VALUES ($1, $2)'
const removeAuthor = 'DELETE FROM author WHERE id = $1'
// how to SET both names???
const updateAuthor = 'UPDATE author SET first_name = $1 WHERE id = $2'

// Queries for Genre Table
const getGenres = 'SELECT * FROM genre'
const getGenreById = 'SELECT * FROM genre WHERE id = $1'
const checkGenreExists = 'SELECT g FROM genre g WHERE g.genre = $1'
const addGenre = 'INSERT INTO genre (genre_id, genre_name) VALUES ($1, $2)'
const removeGenre = 'DELETE FROM genre WHERE id = $1'
const updateGenreId = 'UPDATE genre SET genre_id = $1 WHERE genre_name = $2'
const updateGenreName = 'UPDATE genre SET genre_name = $1 WHERE genre_id = $2'

module.exports = {
    getTitles,
    getTitleById,
    checkTitleExists,
    addTitle,
    removeTitle,
    updateTitle,
    getAuthors,
    getAuthorById,
    checkAuthorExists,
    addAuthor,
    removeAuthor,
    updateAuthor,
    getGenres,
    getGenreById,
    checkGenreExists,
    addGenre,
    removeGenre,
    updateGenreId,
    updateGenreName
}
