// creates abstraction layer between data access and business logic layer of application
// wites method for CRUD to use in controller instead of having data access code in controller
const titleModel = require('../models/titleModel')
const db_context = require('../db_context')

async function getAllTitles() {
    let titles = []
    let data = await db_context.selectAllTitles()
    // populate model with data
    data.forEach((title) => {
        titles.push(
            new titleModel({
                titleId: title.title_id,
                titleBook: title.title_book,
                authorName: title.author_name,
                publYear: title.publ_year,
                genre: title.genre_name,
                totalQuantity: title.total_quantity,
                availableQuantity: title.available_quantity,
                loanedQuantity: title.loaned_quantity
            })
        )
        console.log(title.genre_name)
    })
    return titles
}

async function getTitleByKeyword(keyword) {
    let titles = []
    let data = await db_context.selectTitleByKeyword(keyword)
    // populate model with data
    data.forEach((title) => {
        titles.push(
            new titleModel({
                titleId: title.title_id,
                titleBook: title.title_book,
                authorName: title.author_name,
                publYear: title.publ_year,
                genre: title.genre,
                totalQuantity: title.total_quantity,
                availableQuantity: title.available_quantity,
                loanedQuantity: title.loaned_quantity
            })
        )
    })
    return titles
}
async function getAuthorByKeyword(keyword) {
    let authors = []
    let data = await db_context.selectAuthorByKeyword(keyword)
    // populate model with data
    data.forEach((title) => {
        authors.push(
            new titleModel({
                titleId: title.title_id,
                titleBook: title.title_book,
                authorName: title.author_name,
                publYear: title.publ_year,
                genre: title.genre,
                totalQuantity: title.total_quantity,
                availableQuantity: title.available_quantity,
                loanedQuantity: title.loaned_quantity
            })
        )
    })
    return authors
}

async function addTitle(
    titleBook,
    publYear,
    authorName,
    genre,
    totalQuantity,
    availableQuantity,
    loanedQuantity
) {
    db_context.insertTitle(
        titleBook,
        publYear,
        authorName,
        genre,
        totalQuantity,
        availableQuantity,
        loanedQuantity
    )
}

async function editTitle(titleId, titleBook, publYear, authorName, genre) {
    db_context.updateTitle(titleId, titleBook, publYear, authorName, genre)
}

async function loanTitle(titleId, availableQuantity, loanedQuantity) {
    db_context.loanTitle(titleId, availableQuantity, loanedQuantity)
}

async function removeTitle(titleId) {
    db_context.deleteTitle(titleId)
}

module.exports = {
    getAllTitles,
    getTitleByKeyword,
    getAuthorByKeyword,
    addTitle,
    editTitle,
    loanTitle,
    removeTitle
}
