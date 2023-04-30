// Accessess database through model,
// serves response and functionality to the view
const { getAllTitles, addTitle, removeTitle } = require("../repositories/TitleRepository" );

async function get(req, res) {
    let data = await getAllTitles();
    return res.json(data);
}

async function add(req, res) {
    let data = await addTitle(req.body.postedData, 90);
    return res.json({ message: "Saved" });
}

async function remove(req, res) {
    let data = await removeTitle('TEST123', 90);
    return res.json({ message: "Deleted" });
}

module.exports = {
    get,
    add,
    remove
}
