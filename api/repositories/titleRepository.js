// creates abstraction layer between data access and business logic layer of application
// wites method for CRUD to use in controller instead of having data access code in controller
const titleModel = require('../models/titleModel')
const db_context = require('../db_context')

async function getAllTitles() {
    let titles = []
    let data = await db_context.selectAllTitles()
    data.forEach((title) => {
        titles.push(new titleModel(title.title_book))
    })
    return titles
}

async function addTitle(title, country_id) {
    let result = await db_context.insertTitle(title, country_id)
    return result
}

async function removeTitle(title, country_id) {
    let result = await db_context.deleteTitle(title, country_id)
    return result
}

module.exports = {
    getAllTitles,
    addTitle,
    removeTitle
}
