const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
require('dotenv').config()
const db = require('./models/index.js')

const PORT = process.env.PORT || 3000

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello')
})

// CONTROLLERS
app.use('/user', require('./controllers/user'))
app.use('/crypto', require('./controllers/crypto'))

app.listen(PORT, function() {
    console.log('SERVER IS LIVE')
} )