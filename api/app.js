const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const authorRoute = require('./routes/authorRoute')
app.use('/author', authorRoute)

const titleRoute = require('./routes/titleRoute')
app.use('/title', titleRoute)

app.listen(3001, console.log('http://localhost:3001'))
