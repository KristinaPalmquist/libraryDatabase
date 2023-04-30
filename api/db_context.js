const pgp = require('pg-promise')()
const db = pgp('postgres://postgres:Hipp0Hast74.@localhost:5432/Labb3-Library')

// const { getTitles, getAuthors, addTitle } = require('./queries')

async function selectAllTitles() {
    let titles = await db.many('SELECT * FROM title').catch((error) => {
        console.log('Logged error: ', error)
    })
    return titles
}

async function selectAllAuthors() {
    let authors = await db.many('SELECT * FROM authors').catch((error) => {
        console.log('Logged error: ', error)
    })
    return authors
}

// async function insertTitle() {
//     let result = await db
//         .none(`INSERT INTO title(title_book, publ_year, author_id) VALUES('${title_book}', ${publ_year}, ${author_id})`
//         )
//         .catch((error) => {
//             console.log('Logged error: ', error)
//         })
//     return result
// }

module.exports = {
    selectAllTitles,
    selectAllAuthors
    // insertTitle
}
