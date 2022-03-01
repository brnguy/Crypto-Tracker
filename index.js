const express = require('express')
const ejsLayouts = require('express-ejs-layouts')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.get('/', (req, res) => {
    res.send('Hello')
})


app.listen(PORT, function() {
    console.log('SERVER IS LIVE')
} )