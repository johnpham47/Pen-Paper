const express = require('express')
const app = express(); 
const PORT = process.env.PORT || 8080
const cors = require('cors')
const jwt = require('jsonwebtoken')
const models = require('./models')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

app.use(express.json())
app.use(cors())

app.post('/register', (req, res) => {
    console.log("Registering user...")
    let username = req.body.username
    let password = req.body.password

    models.Users.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if (user) { 
            res.status(500).json({message: "Username already exists"})
        }

        else {
            bcrypt.hash(password, SALT_ROUNDS)
            .then(hash => {
                models.Users.create({
                    username: username,
                    password: hash
                })
            })
        }
    })
})

app.post('/login', (req, res) => {
    console.log('Logging in user...')
    let username = req.body.username
    let password = req.body.password

    models.Users.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password)
            .then((passwordMatch) => {
                if (passwordMatch) {
                    const token = jwt.sign({username: passwordMatch.username}, 'SOMESECRETKEY')
                    console.log(token)
                    res.json({isAuthenticated: true, token: token})
                }
                else {
                    res.json({isAuthenticated: false})
                }
            })
        }
        else {
            res.json({isAuthenticated: false})
        }
    })
})

app.listen(PORT, () => {
    console.log("Server is listening...")
})