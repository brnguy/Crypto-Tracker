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
app.use(async (req, res, next) => {
    if(req.cookies.userId) {
        // decrypting the incoming user id from the cookie
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        // converting the decrypted id into a readable string
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        // querying the db for the user with that id
        const user = await db.user.findByPk(decryptedIdString)
        // assigning the found user to res.locals.user in the routes, and user in the ejs
        res.locals.user = user
    } else res.locals.user = null
    next() // move on to next middleware
})

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