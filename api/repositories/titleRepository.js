// creates abstraction layer between data access and business logic layer of application
// writes method for CRUD to use in controller instead of having data access code in controller
const titleModel = require("../models/titleModel");
const db_context = require("../db_context");

async function getAllTitles() {
  let titles = [];
  let data = await db_context.selectAllTitles();
  // populate model with data
  data.forEach((title) => {
    console.log(title);
    titles.push(
      new titleModel({
        titleId: title.title_id,
        titleBook: title.name,
        authorName: title.author_name,
        publYear: title.year,
        genre: title.genre_name,
        totalQuantity: title.quantity,
        availableQuantity: title.available,
        loanedQuantity: title.loaned,
      })
    );
  });
  return titles;
}

async function getTitleByKeyword(keyword) {
  let titles = [];
  let data = await db_context.selectTitleByKeyword(keyword);
  // populate model with data
  data.forEach((title) => {
    titles.push(
      new titleModel({
        titleId: title.title_id,
        titleBook: title.name,
        authorName: title.author_name,
        publYear: title.year,
        genre: title.genre_name,
        totalQuantity: title.quantity,
        availableQuantity: title.available,
        loanedQuantity: title.loaned,
      })
    );
  });
  return titles;
}
async function getAuthorByKeyword(keyword) {
  let authors = [];
  let data = await db_context.selectAuthorByKeyword(
    keyword
  );
  // populate model with data
  data.forEach((title) => {
    authors.push(
      new titleModel({
        titleId: title.title_id,
        titleBook: title.name,
        authorName: title.author_name,
        publYear: title.year,
        genre: title.genre_name,
        totalQuantity: title.quantity,
        availableQuantity: title.available,
        loanedQuantity: title.loaned,
      })
    );
  });
  return authors;
}

async function addTitle(
  titleBook,
  publYear,
  authorName,
  genre, // This could be a string or array of genre names
  totalQuantity = 5,
  availableQuantity = 5,
  loanedQuantity = 0
) {
  // Convert genre to array if it's a string
  const genreArray = Array.isArray(genre) ? genre : [genre];
  
  return await db_context.insertTitle(
    titleBook,
    publYear,
    authorName,
    genreArray,
    totalQuantity,
    availableQuantity,
    loanedQuantity
  );
}

async function editTitle(
  titleId,
  titleBook,
  publYear,
  authorName,
  genre
) {
  db_context.updateTitle(
    titleId,
    titleBook,
    publYear,
    authorName,
    genre
  );
}

async function loanTitle(
  titleId,
  availableQuantity,
  loanedQuantity
) {
  db_context.loanTitle(
    titleId,
    availableQuantity,
    loanedQuantity
  );
}

async function removeTitle(titleId) {
  db_context.deleteTitle(titleId);
}

module.exports = {
  getAllTitles,
  getTitleByKeyword,
  getAuthorByKeyword,
  addTitle,
  editTitle,
  loanTitle,
  removeTitle,
};
