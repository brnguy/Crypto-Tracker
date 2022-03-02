const { password } = require('pg/lib/defaults')
const db = require('./models')

db.user.create({
    username: "Tester",
    email: "testing@gmail.com",
    password: "Test123"
})
    .then(user => {
        console.log(user)
    })
    .catch(console.log)