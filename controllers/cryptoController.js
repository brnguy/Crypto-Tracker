let express = require('express')
let db = require('../models')
let router = express.Router()
const axios = require('axios')

router.get('/', (req, res) => {
    const url = `https://rest.coinapi.io/v1/assets/?apikey=${process.env.COINAPI_KEY}&output_format=json`
    axios.get(url)
        .then(response => {
            let cryptoList = response.data
            res.render('./crypto/index', { cryptoList: cryptoList })
        })
})

module.exports = router