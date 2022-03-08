let express = require('express')
let router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
const { sequelize } = require('../models')
const { user } = require('pg/lib/defaults')
require('dotenv').config()
const methodOverride = require('method-override')
const fs = require('fs')
const position = require('../models/position')


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

router.get('/favorites', async (req, res) => {
    favorites = await db.cryptocurrency.findAll()
    res.render('user/favorites', {favorites: favorites})
})

router.post('/favorites/:id', (req, res) => {
    db.cryptocurrency.findOrCreate({
        where: {assetId: req.params.id}
    })
    res.redirect('/users/favorites')
})

router.get('/portfolio', async (req, res) => {
    const positions = await db.position.findAll()
    res.render('user/portfolio/index', {positions: positions})
})

router.get('/portfolio/new', (req, res) => {
    res.render('user/portfolio/new')
})

router.post('/portfolio', async (req, res) => {
    try{
        const foundUser = await db.user.findOne({
            where: {id: user}
        })
        await foundUser.createPosition({
                asset: req.body.asset,
                quantity: req.body.quantity,
                purchasePrice: req.body.purchasePrice,
                purchaseDate: req.body.purchaseDate,
                amount: (req.body.quantity * req.body.purchasePrice),
        })
    } catch (err) {
        console.log(err)
    }
    res.redirect('/users/portfolio')
})

router.get('/portfolio/:id/edit', async (req, res) => {
    const position = await db.position.findOne({
        where: {id: req.params.id}
    })
    res.render('user/portfolio/edit', {position: position})
})

router.delete('/portfolio/:id', async (req, res) => {
    await db.position.destroy({
        where: {id: req.params.id}
    })
    res.redirect('/users/portfolio')
})

router.put('/portfolio/:id', (req, res) => {
    db.position.update({
        asset: req.body.asset,
        quantity: req.body.quantity,
        purchasePrice: req.body.purchasePrice,
        purchaseDate: req.body.purchaseDate,
        amount: (req.body.quantity * req.body.purchasePrice)
    },
    {
        where: {id: req.params.id}
    })
    res.redirect('/users/portfolio')
})


router.get('/logout', (req, res) => {
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

module.exports = router