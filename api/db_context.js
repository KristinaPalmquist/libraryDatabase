const pgpromise = require('pg-promise')
const database = pgpromise(
    'postgres://postgres:Hipp0Hast74.@localhost:5432/Labb3-Library'
)
const { getTitles, getAuthors, addTitle } = require('../app/queries')

async function selectAllTitles() {
    let titles = await database.many(getTitles)
    return titles
}

async function selectAllAuthors() {
    let authors = await database.many(getAuthors)
    return authors
}

async function insertTitle() {
    let result = await database
        .none(
            // addTitle
            `INSERT INTO title(title_book, publ_year, author_id) VALUES('${title.book}', ${publ_year}, ${author_id})`
        )
        .catch((error) => {
            console.log('Logged error: ', error)
        })
    return result
}

module.exports = {
    selectAllTitles,
    selectAllAuthors,
    insertTitle
}
