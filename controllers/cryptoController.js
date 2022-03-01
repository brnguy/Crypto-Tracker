let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')

router.get('/', (req, res) => {
    const url = `https://rest.coinapi.io/v1/assets/?apikey=${process.env.COINAPI_KEY}`
    axios.get(url)
        .then(response => {
            let cryptoList = response.data
            res.render('./crypto/index', { cryptoList: cryptoList })
        })
})

router.get('/:asset_id', (req, res) => {
    const url = `https://rest.coinapi.io/v1/assets/${req.params.asset_id}?apikey=${process.env.COINAPI_KEY}`
    axios.get(url)
        .then(response => {
            const cryptoDetails = response.data[0]
            res.render('./crypto/show', { cryptoDetails: cryptoDetails })
        })
})


module.exports = router