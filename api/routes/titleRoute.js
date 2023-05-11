const express = require('express')
const router = express.Router()
const controller = require('../controllers/titleController')

router.get('/all', async (req, res) => {
    await controller.get(req, res)
})

router.post('/add', async (req, res) => {
    await controller.add(req, res)
    res.sendStatus(200)
})

router.put('/edit', async (req, res) => {
    await controller.edit(req, res)
    res.sendStatus(200)
})

router.put('/loan', async (req, res) => {
    await controller.loan(req, res)
    res.sendStatus(200)
})

router.delete('/remove', async (req, res) => {
    await controller.remove(req, res)
    res.sendStatus(200)
})

router.get('/searchTitle', async (req, res) => {
    await controller.searchTitle(req, res)
})

router.get('/searchAuthor', async (req, res) => {
    await controller.searchAuthor(req, res)
})

module.exports = router
