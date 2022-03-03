let express = require('express')
let router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const Op = require('Sequelize').Op
const axios = require('axios')
const { sequelize } = require('../models')
const { user } = require('pg/lib/defaults')
require('dotenv').config()


router.get('/', (req, res) => {
    res.send('User Page')
})

router.get('/new', (req, res) => {
    res.render('user/new')
})

router.post('/', async (req, res) => {
    const [newUser, created] = await db.user.findOrCreate({
        where: {email: req.body.email} // find or create username too
    })
    if(!created){
        console.log('User already exists')
        // render the login page and send an appropriate message
    } else {
        // hash the user
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.password = hashedPassword
        await newUser.save()

        // encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        console.log(encryptedUserIdString)
        // store the encrypted id in the cookie of the res obj
        res.cookie('userId', encryptedUserIdString)
        // redirect back to home page
        res.redirect('/')
    }
})

router.get('/login', (req, res) => {
    res.render('user/login.ejs')
})

router.post('/login', async (req, res) => {
    const user = await db.user.findOne({where: {email: req.body.email}})
    if(!user) {
        console.log('user not found')
        res.render('user/login', {error: 'Invalid email/password'})
    } else if(!bcrypt.compareSync(req.body.password, user.password)) {
        console.log('Incorrect Password')
        res.render('user/login', {error: 'Invalid email/password'})
    } else {
        console.log('logging in the user!')
        // encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        console.log(encryptedUserIdString)
        // store the encrypted id in the cookie of the res obj
        res.cookie('userId', encryptedUserIdString)
        // redirect back to home page
        res.redirect('/')
    }
})

router.get('/favorites', (req, res) => {
    res.render('user/favorites')
})

router.get('/portfolio', async (req, res) => {
    const positions = await db.position.findAll()
    res.render('user/portfolio/index', {positions: positions})
})

router.get('/portfolio/new', (req, res) => {
    const url = `https://rest.coinapi.io/v1/assets/?apikey=${process.env.COINAPI_KEY}`
    axios.get(url)
        .then(response => {
            let cryptoList = response.data
            res.render('user/portfolio/new', { cryptoList: cryptoList })
        })
})

router.post('/portfolio', async (req, res) => {
    db.position.create({
            asset: req.body.asset,
            quantity: req.body.quantity,
            purchasePrice: req.body.purchasePrice,
            purchaseDate: req.body.purchaseDate,
            amount: (req.body.quantity * req.body.purchasePrice),
            userId: db.user.id
    })
    res.render('user/portfolio/index')
})

router.get('/portfolio/edit', (req, res) => {
    const url = `https://rest.coinapi.io/v1/assets/?apikey=${process.env.COINAPI_KEY}`
    axios.get(url)
        .then(response => {
            let cryptoList = response.data
            res.render('user/portfolio/edit', { cryptoList: cryptoList })
        })
})

router.get('/logout', (req, res) => {
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

module.exports = router