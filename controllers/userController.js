let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')

router.get('/', (req, res) => {
    res.send('User Page')
})

router.get('/new', (req, res) => {
    res.render('./user/new')
})

router.get('/login', (req, res) => {
    res.render('./user/login')
})

router.get('/favorites', (req, res) => {
    res.render('./user/favorites')
})

router.get('/portfolio', (req, res) => {
    res.render('./user/portfolio')
})

router.get('/logout', (req, res) => {
    res.send('Logged Out')
})

module.exports = router