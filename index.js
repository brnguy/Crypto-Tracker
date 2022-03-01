const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const { get } = require('express/lib/response')
require('dotenv').config()
const db = require('./models/index.js')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 3000

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);


app.get('/', (req, res) => {
    const url = `https://rest.coinapi.io/v1/assets/?apikey=${process.env.COINAPI_KEY}&output_format=json`
    axios.get(url)
        .then(response => {
            console.log(response.data)
        })
})

// CONTROLLERS
app.use('/users', require('./controllers/userController'))
app.use('/cryptos', require('./controllers/cryptoController'))

app.listen(PORT, function() {
    console.log('SERVER IS LIVE')
} )