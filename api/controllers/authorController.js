const {
    getAllAuthors,
    editAuthor,
    getAuthorByKeyword
} = require('../repositories/authorRepository')

async function get(req, res) {
    let data = await getAllAuthors()

    return res.json(data)
}

async function edit(req, res) {
    await editAuthor(req.body.id, req.body.email)

    return res.json({ message: 'edited' })
}

async function search(req, res) {
    let data = await getAuthorByKeyword(req.query.keyword)
    console.log(data)
    return res.json(data)
}

module.exports = {
    get,
    edit,
    search
}
