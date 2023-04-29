const express = require('express')
const router = express.Router()
const controller = require('../controllers/authorController')

router.get('/all', async (req, res) => {
    await controller.get(req, res)
})

router.get('/search', async (req, res) => {
    console.log(req.query)
    await controller.get(req, res)
})

router.put('/', async (req, res) => {
    await controller.edit(req, res)
})

module.exports = router
