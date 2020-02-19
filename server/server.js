const express = require('express')
const app = express(); 
const PORT = process.env.PORT || 8080
const cors = require('cors')
const jwt = require('jsonwebtoken')
const models = require('./models')
const bcrypt = require('bcrypt')
const session = require('express-session')
const SALT_ROUNDS = 10

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(
    session({
        secret: 'SEEEECRET',
        resave: false,
        saveUninitialized: true
    })
);

app.post('/register', (req, res) => {
    console.log("Registering user...")
    let username = req.body.username
    let password = req.body.password

    models.User.findOne({
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
                models.User.create({
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

    models.User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password)
            .then((passwordMatch) => {
                req.session.userId = user.id
                if (passwordMatch) {
                    const token = jwt.sign({username: passwordMatch.username}, 'SOMESECRETKEY')
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

app.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
    }
})

app.listen(PORT, () => {
    console.log("Server is listening...")
})