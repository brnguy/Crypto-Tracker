let express = require('express')
let router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config()

router.get('/', (req, res) => {
    res.send('User Page')
})

router.get('/new', (req, res) => {
    res.render('user/new')
})

router.post('/', async (req, res) => {
    const [newUser, created] = await db.user.findOrCreate({
        where: {email: req.body.email} //// If/else statement to check username then email?
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
        res.render('users/login', {error: 'Invalid email/password'})
    } else if(!bcrypt.compareSync(req.body.password, user.password)) {
        console.log('Incorrect Password')
        res.render('users/login', {error: 'Invalid email/password'})
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
    res.render('users/favorites')
})

router.get('/portfolio', (req, res) => {
    res.render('users/portfolio')
})

router.get('/logout', (req, res) => {
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

module.exports = router