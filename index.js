const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js')
const db = require('./models/index.js')

const PORT = process.env.PORT || 3000

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// CUSTOM LOGIN MIDDLEWARE


// CONTROLLERS
app.use('/users', require('./controllers/userController.js'))
app.use('/cryptos', require('./controllers/cryptoController.js'))

// ROUTES
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(PORT, function() {
    console.log('SERVER IS LIVE')
} )