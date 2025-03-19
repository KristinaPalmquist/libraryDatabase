const pgp = require('pg-promise')()
const db = pgp('postgres://postgres:postgres@localhost:5432/library')

async function selectAllTitles() {
    let titles = await db.many(
        'SELECT * FROM title INNER JOIN genre ON title.genre_id = genre.id ORDER BY title.id'
    )
    return titles
}

async function selectTitleByKeyword(keyword) {
    let data = await db.any(
        `SELECT * FROM title WHERE (LOWER(name) LIKE LOWER('%${keyword}%'))`
    )
    return data
}

async function selectAuthorByKeyword(keyword) {
    let data = await db.any(
        `SELECT * FROM title WHERE (LOWER(author_name) LIKE LOWER('%${keyword}%'))`
    )
    return data
}

async function insertTitle(titleBook, publYear, authorName, genre) {
    db.none(
        `INSERT INTO title (name, published_year, author_name, genre, total_quantity, available_quantity, loaned_quantity) VALUES('${titleBook}', ${publYear}, '${authorName}', '${genre}', 5, 5, 0)`
    )
}

async function updateTitle(titleId, titleBook, publYear, authorName, genre) {
    db.none(
        `UPDATE title SET name = '${titleBook}', published_year = ${publYear}, author_name = '${authorName}', genre = '${genre}' WHERE title.id = ${titleId}`
    )
}

async function loanTitle(titleId, availableQuantity, loanedQuantity) {
    db.none(
        `UPDATE title SET available_quantity = '${availableQuantity}', loaned_quantity = ${loanedQuantity} WHERE title.id = ${titleId}`
    )
}

async function deleteTitle(titleId) {
    await db.none(`DELETE FROM title WHERE title_id = '${titleId}'`)
}

module.exports = {
    selectAllTitles,
    selectTitleByKeyword,
    selectAuthorByKeyword,
    insertTitle,
    updateTitle,
    loanTitle,
    deleteTitle
}
