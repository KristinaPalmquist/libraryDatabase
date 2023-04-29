const authorModel = require("../models/authorModel");
const db_context = require("../db_context");

async function getAuthorByKeyword() {

    let authors = [];

    let data = await db_context.selectAllAuthors()

    data.forEach(author => {
        authors.push(new authorModel(author.first_name, author.email))
    });

    return authors;
};

async function getAllAuthors() {

    let authors = [];

    let data = await db_context.selectAllAuthors()

    data.forEach(author => {
        authors.push(new authorModel(author.first_name, author.email))
    });

    return authors;
};

async function editAuthor(id, email) {
    db_context.updateAuthoreditAuthorEmailById(id, email);
};

async function search(req, res) {

}

module.exports = {
    getAllAuthors,
    editAuthor,
    getAuthorByKeyword
}
