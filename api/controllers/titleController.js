// Accesses database through model, serves response and functionality to the view
const {
    getAllTitles,
    addTitle,
    editTitle,
    loanTitle,
    removeTitle,
    getTitleByKeyword,
    getAuthorByKeyword
} = require('../repositories/titleRepository')

async function get(req, res) {
    let data = await getAllTitles()
    return res.json(data)
}

async function searchTitle(req, res) {
    let data = await getTitleByKeyword(req.query.keyword)
    return res.json(data)
}

async function searchAuthor(req, res) {
    let data = await getAuthorByKeyword(req.query.keyword)
    return res.json(data)
}

async function add(req, res) {
    await addTitle(
        req.body.titleBook,
        req.body.publYear,
        req.body.authorName,
        req.body.genre,
        req.body.total_quantity,
        req.body.available_quantity,
        req.body.loaned_quantity
    )
}

async function edit(req, res) {
    await editTitle(
        req.body.titleId,
        req.body.titleBook,
        req.body.publYear,
        req.body.authorName,
        req.body.genre
    )
}

async function loan(req, res) {
    await loanTitle(
        req.body.titleId,
        req.body.availableQuantity,
        req.body.loanedQuantity
    )
}

async function remove(req, res) {
    await removeTitle(req.body.titleId)
}

module.exports = {
    get,
    searchTitle,
    searchAuthor,
    add,
    edit,
    loan,
    remove
}
