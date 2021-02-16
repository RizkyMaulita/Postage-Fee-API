require('dotenv').config()

const express = require('express')
const port = 3000
const app = express()
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(port, () => console.log('connected on ', port))