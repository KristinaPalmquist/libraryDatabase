const express = require('express');
const router = express.Router();
const controller = require('../controllers/titleController');

router.get("/all", async (req, res) => {
    await controller.get(req, res)
});

router.post("/create", async (req, res) => {

    await controller.add(req, res)
});

router.get("/delete", async (req, res) => {

    await controller.remove(req, res)
});

module.exports = router;
