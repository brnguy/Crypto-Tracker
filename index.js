const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const { get } = require('express/lib/response')
require('dotenv').config()
const db = require('./models/index.js')
const axios = require('axios')
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js')

const app = express()
const PORT = process.env.PORT || 3000

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)

app.get('/', (req, res) => {
    res.render('home.ejs')
})

// CONTROLLERS
app.use('/users', require('./controllers/userController'))
app.use('/cryptos', require('./controllers/cryptoController'))

app.listen(PORT, function() {
    console.log('SERVER IS LIVE')
} )