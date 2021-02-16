require('dotenv').config()

const express = require('express')
const port = 3000
const app = express()
const router = require('./routes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

app.listen(port, () => console.log('connected on ', port))