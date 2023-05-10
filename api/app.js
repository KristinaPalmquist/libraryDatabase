const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())


const titleRoute = require('./routes/titleRoute')
app.use('/title', titleRoute)

const PORT = 5421
app.listen(PORT, console.log('http://localhost:' + PORT))
